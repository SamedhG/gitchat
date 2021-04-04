import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap';

import { join } from './call'
import store from '../store';
import UserCard from './UserCard';

function Room({call}) {
    return (JSON.stringify(call))
}

function CallRoom({call}) {
    const { repo_user, repo_name } = useParams();
    const [localStream, setLocalStream] = useState(null)
    const [joined, setJoined] = useState(false);

    async function onJoin() {
        let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
        setLocalStream(stream)
        join(`${repo_user}/${repo_name}`, stream)
    }

    return (<>
        <h2>Room {repo_name} </h2>
        <h4> You </h4>
        { localStream && <UserCard mediaStream = {localStream} /> }
        { call && <Room call={call}/> }
        { <Button onClick={onJoin}>Join</Button> }
    </>)
}

export default connect(({call})=>({call}))(CallRoom);
