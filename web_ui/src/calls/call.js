import {Socket} from "phoenix"
import store from '../store'
import Peer from 'peerjs';


const SOCKET_URL = process.NODE_ENV === "production" ?
    "/socket" :
    "ws://localhost:4000/socket"

export function join(room_id, local_stream, call_setter) {

    let state = store.getState()
    if (state.user == null) return;

    let call = []

    call_setter(call)
    
    function add_caller(stream, user) {
        let caller = {user: user, stream: stream}
        call = call.filter(c => c.user !== user)
        call.push(caller)
        call_setter(call)
    }
    
    var peer = new Peer({
        config: {'iceServers': [
            { url: 'stun:stun.l.google.com:19302' },
        ]} 
    });


    peer.on('open', (my_peer_id) =>  {

        let socket = new Socket(SOCKET_URL, {params: {}})
        socket.connect()
        
        const me = {user: state.user.login, peer_id: my_peer_id}

        let channel = socket.channel("room:" + room_id, 
            {token: state.user.access_token , peer_id: my_peer_id})
        // TODO: use redux to set the error / success state
        channel.join()
            .receive("ok", (x) => {

                // Call all the collaborators
                let calls = x.collaborators.reduce(
                    (acc, caller) => {
                        if(state.user.login !== caller.user) {
                            peer.connect(caller.peer_id)
                            return [...acc, peer.call(caller.peer_id, local_stream, {metadata: me})]
                        } else { return acc }
                    }, [])

                // If they answer add them to the callers
                calls.forEach((c) => c.on('stream', (remote_stream) => {
                    console.log("answered call from ", c.metadata)
                    add_caller(remote_stream, c.metadata.user)
                }))

                store.dispatch({type: "room/set", data: x})
            })
            .receive("error", resp => console.log("Unable to join", resp));
    })

    // If someone calls you answer
    peer.on('call', (c) => {
        console.log("received call from ", c.metadata)
        c.answer(local_stream)
        c.on('stream', (remote_stream) => {
            add_caller(remote_stream, c.metadata.user)
        })
    })
}
