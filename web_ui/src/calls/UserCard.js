import { Card } from 'react-bootstrap'
import Visualizer from './Visualizer'

export default function UserCard({user, mediaStream}) {

    return (
        <Card> 
            <Visualizer mediaStream={mediaStream} />
        </Card>
    )

}
