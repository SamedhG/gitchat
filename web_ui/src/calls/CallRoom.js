import { connect } from 'react-redux';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { join } from './call'
import store from '../store';
import UserCard from './UserCard';

function CallRoom({call}) {
    const { room_id } = useParams();
    const [localStream, setLocalStream] = useState(null)
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: false, audio: true})
            .then((stream) => {
                setLocalStream(stream)
                join("hello", "no")
            }).catch(() => {
                setLocalStream(null)
            })
    }, [room_id])
    return (<div>
        { localStream && <UserCard mediaStream = {localStream} /> }
        </div>)
}

export default connect(({call})=>({call}))(CallRoom);
