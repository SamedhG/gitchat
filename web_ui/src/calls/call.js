import {Socket} from "phoenix"
import store from '../store'
import Peer from 'peerjs';


const SOCKET_URL = process.NODE_ENV === "production" ?
    "ws://gitchat.samedh.site/socket" :
    "ws://localhost:4000/socket"

export function join(room_id, local_stream) {

    let state = store.getState()
    if (state.user == null) return;

    store.dispatch({type: "call/clear"})


    var peer = new Peer({
        config: {'iceServers': [
            { url: 'stun:stun.l.google.com:19302' },
        ]} 
    });
    console.log(peer)

    peer.on('open', (my_peer_id) =>  {
        
        let socket = new Socket(SOCKET_URL, {params: {}})
        socket.connect()

        // TODO: retrieve token from the session here
        // Currently cheating by treating token as the username
        let channel = socket.channel("room:" + room_id, 
            {token: state.user.access_token , peer_id: my_peer_id})
        // TODO: use redux to set the error / success state
        channel.join()
            .receive("ok", (x) => {
                // Call all the collaborators
                let calls = x.collaborators.reduce(
                    (acc, caller) => {
                        //if(state.user.login !== caller.user) {
                        peer.connect(caller.peer_id)
                        return [...acc, peer.call(caller.peer_id, local_stream, {metadata: caller})]
                        //} else { return acc }}
                    }, [])
                // If they answer add them to the callers
                calls.forEach((call) => call.on('stream', (remote_stream) => {
                    console.log("answered call from ", call.metadata)
                    store.dispatch({
                        type: "call/push", 
                        data: {user: call.metadata.user, stream: remote_stream}}) 
                }))
                store.dispatch({type: "room/set", data: x})
            })
            .receive("error", resp => console.log("Unable to join", resp));
    })

    // If someone calls you answer
    peer.on('call', (call) => {
        console.log("received call from ", call.metadata)
        call.answer(local_stream)
        call.on('stream', (remote_stream) =>
            store.dispatch({
                type: "call/push", 
                data: {user: call.metadata.user, stream: remote_stream}})) 
    })
}


