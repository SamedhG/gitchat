import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { join } from './call'
import store from '../store';
import UserCard from './UserCard';

function Room({call}) {
    return call.map((c) => <UserCard mediaStream={c.stream} username={c.user}/>)
}

export default function CallRoom() {
    const { repo_user, repo_name } = useParams();
    const [localStream, setLocalStream] = useState(null)
    const [call, setCall] = useState(null)

    async function onJoin() {
        let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
        setLocalStream(stream)
        join(`${repo_user}/${repo_name}`, stream, setCall)
    }

    return (<>
        <h2>Room {repo_name} </h2>
        <h4> You </h4>
        { localStream && <UserCard mediaStream = {localStream} username={repo_user} /> }
        { call ? <Room call={call}/> : <Button onClick={onJoin}>Join</Button> }
    </>)
}

