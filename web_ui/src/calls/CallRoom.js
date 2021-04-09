import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Nav from '../Nav'

import { join } from './call'
import store from '../store';
import UserCard from './UserCard';

function Room({call}) {
    return call.map((c, i) =>
        <UserCard mediaStream={c.stream} username={c.user} key={i} play={true} />)
}

function CallRoom({user}) {
    const { repo_user, repo_name } = useParams();
    const [localStream, setLocalStream] = useState(null)
    const [call, setCall] = useState(null)

    async function onJoin() {
        let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
        setLocalStream(stream)
        join(`${repo_user}/${repo_name}`, stream, setCall)
    }

    return (<>
        <Nav />
        <h2>Room {repo_name} </h2>
        <h4> You </h4>
        { localStream &&
        <UserCard
            mediaStream = {localStream}
            username={user.login}
            key="me"
            play={false}/> }
        { call ? <Room call={call}/> : <Button onClick={onJoin}>Join</Button> }
    </>)
}

export default connect(({user}) => ({user}))(CallRoom)
