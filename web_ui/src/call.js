import {Socket} from "phoenix"

let socket = new Socket("ws://localhost:4000/socket", {params: {}})
socket.connect()


export function join(room_id, peer_id) {

    // TODO: retrieve token from the session here
    // Currently cheating by treating token as the username
    let channel = socket.channel("room:" + room_id, 
        {token: peer_id, peer_id: peer_id})
    // TODO: use redux to set the error / success state
    channel.join()
        .receive("ok", () => console.log("Joined Channel"))
        .receive("error", resp => console.log("Unable to join", resp));
}
