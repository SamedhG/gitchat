import {Socket} from "phoenix"
import store from '../store'
import Peer from 'peerjs';


const SOCKET_URL = process.NODE_ENV === "production" ?
    "/socket" :
    "ws://localhost:4000/socket"

let peer = new Peer({
    config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
    ]} 
});

let socket = new Socket(SOCKET_URL, {params: {}})
socket.connect()

let call_setter = null;
let call = []
let channel = null
let local_stream = null;
let me = {}

function remove_caller(user) {
    call = call.filter(c => c.user !== user)
    call_setter(call)
}

function add_caller(stream, user) {
    let caller = {user: user, stream: stream}
    call = call.filter(c => c.user !== user)
    call.push(caller)
    call_setter(call)
}

export function join(room_id, stream, setCall) {

    let state = store.getState()
    if (state.user == null) return;
    
    local_stream = stream

    call = []
    call_setter = setCall
    call_setter(call)


    channel = socket.channel("room:" + room_id, {token: state.user.access_token , peer_id: peer.id})
    channel.join()
        .receive("ok", (x) => {
            let role = 
                x.collaborators.find(({user}) => state.user.login === user) ?
                "collaborator" : "user"

        me = {role, user: state.user.login, peer_id: peer.id}
            store.dispatch({type: "room/set", data: x})
        })
        .receive("error", resp => console.log("Unable to join", resp));
    channel.on('leave', ({user}) => remove_caller(user))
    channel.on('user', (caller) => setTimeout(() => {
        const {peer_id} = caller
        // Only collaborators have to connect to users
        if(me.role === "collaborator") {
            // we just want to send them our stream and not wait for their stream
            peer.call(peer_id, local_stream, {metadata: me})
        }
        store.dispatch({type: "room/user", data: caller})
    }, 1000))
    channel.on('collaborator', (caller) => setTimeout(() => {
        const {peer_id} = caller
        // Everyone wants to connect to a collaborator
        let c = peer.call(peer_id, local_stream, {metadata: me})
        c.on('stream', (remote_stream) => {
            console.log("answered call from ", JSON.stringify(c.metadata))
            add_caller(remote_stream, c.metadata.user)
        })
        store.dispatch({type: "room/collaborator", data: caller})
    }, 1000))
}

// If someone calls you answer appropriately
peer.on('call', (c) => {
    console.log("received call from ", JSON.stringify(c.metadata))
    if(me.role === "collaborator" && c.metadata.role === "user") {
        // I just respond with my own stream but the users stream is useless
        c.answer(local_stream)
    }
    else if(me.role === "collaborator" && c.metadata.role === "collaborator") {
        // I want to send my data and also get their stream
        c.answer(local_stream)
        c.on('stream', (remote_stream) => {
            add_caller(remote_stream, c.metadata.user)
        })
    } else if(me.role === "user" && c.metadata.role === "collaborator") {
        c.answer()
        c.on('stream', (remote_stream) => {
            add_caller(remote_stream, c.metadata.user)
        })

    } else {
        console.log("ERROR UNEXPECTED CALL", JSON.stringify(c))
    }
    
})

