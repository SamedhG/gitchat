import { Card } from 'react-bootstrap'
import Visualizer from './Visualizer'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import muteIcon from './mic-fill.svg';
import unmute from './mic-mute-fill.svg';

export default function UserCard({username, mediaStream, play}) {
    const [mute, setMute] = useState(false); //are we muted?
    /**
     * TODO:
     * 1. Fix the visualizer on the bottom
     * 2. Make mute button less aggressive
     */

    //handle clicking mute/unmute
    function toggleMute() {
        mediaStream.getTracks()[0].enabled = !mediaStream.getTracks()[0].enabled;
        setMute(!mute);
    }



    //url to profile picture
    function profilePicturePath() {
        return "https://github.com/" + username + ".png"
    }
    return (
        <Card className="text-center" style={{ maxWidth: '200px', maxHeight: '300px'}} >
            <Card.Header className="d-flex justify-content-md-between ">
                {username}
            </Card.Header>
            <Card.Img 
                src={profilePicturePath()} alt="Profile Picture" 
                style={{ width: '200px', height: '200px'}} />
            <Card.ImgOverlay>

                <Card.Body>
                    <div className="d-flex flex-column">
                        <div className="p-2">
                            <Button variant="secondary" 
                                onClick={toggleMute}>
                                <img src={mute ? unmute : muteIcon} alt="mute" />
                            </Button>
                        </div>
                        <div className="mt-auto p-3">
                            {play && 
                            <audio 
                                autoPlay={true} 
                                ref={audio => {if (audio) audio.srcObject = mediaStream}}
                                style = {{width: 0}}/>}

                            <Visualizer mediaStream={mediaStream} />

                        </div>
                    </div>


                </Card.Body>
            </Card.ImgOverlay>
        </Card>
    )
}
