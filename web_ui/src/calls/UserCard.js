import { Card } from 'react-bootstrap'
import Visualizer from './Visualizer'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import muteIcon from './mic-fill.svg';
import unmute from './mic-mute-fill.svg';

export default function UserCard({username, mediaStream, play}) {
    const [showButton, setShowButton] = useState(false); // mute button appears on hover
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
            return ( <Button variant="secondary" 
                onClick={() => toggleMute()}>
                <img src={unmute} alt="unmute"/>
            </Button>);
        }
        else {
            return ( <Button 
                variant="secondary" 
                onClick={() => toggleMute()}>
                <img src={muteIcon} alt="mute"/>
            </Button>);
        }
    }

    //url to profile picture
    function profilePicturePath() {
        return "https://github.com/" + username + ".png"
    }


    return (
        <Card className="text-center" style={{ width: '200px', height: '200px'}} 
            onMouseEnter={() => setShowButton(true)} 
            onMouseLeave={() => setShowButton(false)}>
            <Card.Img 
                src={profilePicturePath()} alt="Profile Picture" 
                style={{ width: '200px', height: '200px'}} />
            <Card.ImgOverlay>
                <Card.Body style ={{display: "flex", flexDirection: "column"}}>
                    {username}
                    {showButton && muteButton()}
                    {play && 
                        <audio 
                            autoPlay={true} 
                            ref={audio => {if (audio) audio.srcObject = mediaStream}}
                            style = {{width: 0}}/>}

                    <div style={{marginTop: "auto"}}>
                        <Visualizer mediaStream={mediaStream} />
                    </div> 

                </Card.Body>
            </Card.ImgOverlay>
        </Card>
    )
}
