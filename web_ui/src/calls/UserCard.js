import { Card } from 'react-bootstrap'
import Visualizer from './Visualizer'
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function UserCard({username, mediaStream}) {
    //assuming we have user username?
    //and the path(?) to profile picture

    return (
        <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*" alt="Profile Picture" />
            <Card.ImgOverlay>
                <Card.Body>
                    <Card.Header>{username}</Card.Header>
                    <Visualizer mediaStream={mediaStream} />
                    <ToggleButton
                    type="checkbox"
                    variant="primary"
                    value={1}
                    >Hello</ToggleButton>
                </Card.Body> 
            </Card.ImgOverlay>
        </Card>
    )

}
