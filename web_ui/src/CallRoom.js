import { connect } from 'react-redux';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { join } from './call'
import store from './store';

function CallRoom({call}) {
    const { room_id } = useParams();
    useEffect(() => {
        join("hello", "no")
    })
    return (<div>hello</div>)
}

export default connect(({call})=>({call}))(CallRoom);
