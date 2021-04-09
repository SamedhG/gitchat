import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Button, CardColumns, ListGroup} from 'react-bootstrap';
import Nav from '../Nav'

import { join, leave } from './call'
import UserCard from './UserCard';

function Room({call, localStream, user, room}) {
    return (
        <>
            <div className="d-flex align-items-start">
            <UserCard
                mediaStream = {localStream}
                username={user.login}
                key="me"
                play={false}/>  

            <Button onClick={leave}>Leave</Button>
            </div>
            <h2>Talking</h2>
            <CardColumns>
                {call.map((c, i) =>
                <UserCard mediaStream={c.stream} username={c.user} key={i} play={true} />)}
            </CardColumns>
            <h2>Listening In</h2>
            <ListGroup>
                {room && room.users.map((u, ii) => (
                    <ListGroup.Item key={ii}>{u.user}</ListGroup.Item>))}
            </ListGroup>
        </>
    )
}

function CallRoom({user, room}) {
    const { repo_user, repo_name } = useParams();
    const [localStream, setLocalStream] = useState(null)
    const [call, setCall] = useState(null)

    useEffect(() => {
        return () => {
            leave()
        }
    }, [])


    async function onJoin() {
        let stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
        setLocalStream(stream)
        join(`${repo_user}/${repo_name}`, stream, setCall)
    }

    return (<>
        <Nav />
        <h2>Room {repo_name} </h2>
        { call ? <Room call={call} user={user} localStream={localStream} room={room}/> : <Button onClick={onJoin}>Join</Button> }
    </>)

}

export default connect(({user, room}) => ({user, room}))(CallRoom)
