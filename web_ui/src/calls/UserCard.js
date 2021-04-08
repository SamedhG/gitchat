import { Card } from 'react-bootstrap'
import Visualizer from './Visualizer'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import muteIcon from './mic-fill.svg';
import unmute from './mic-mute-fill.svg';

export default function UserCard({username, mediaStream}) {
    const [showButton, setShowButton] = useState(false); //mute button appears on hover
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

    //render the mute/unmute button
    function muteButton() {
        if(mute) {
            return (<Button variant="primary" onClick={() => toggleMute()}><img src={unmute}/></Button>);
        }
        else {
            return (<Button variant="primary" onClick={() => toggleMute()}><img src={muteIcon}/></Button>);
        }
    }

    //url to profile picture
    function profilePicturePath() {
        console.log("github.com/" + username + ".png");
        return "https://github.com/" + username + ".png"
    }


    return (
            <Card className="text-center" style={{ width: '200px', height: '200px'}} onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
                <Card.Img src={profilePicturePath()} alt="Profile Picture" style={{ width: '200px', height: '200px'}} />
                <Card.ImgOverlay>
                    <Card.Body>
                        <div style={{height: '30%'}}>{showButton ? 
                            muteButton() : <Button variant= 'primary' style={{visibility: 'hidden'} }>Yeet</Button>}</div>
                        <div><Visualizer style={{position: "absolute", bottom: 0}} mediaStream={mediaStream} /></div> 
                    </Card.Body>
                </Card.ImgOverlay>
            </Card>
    )
}
