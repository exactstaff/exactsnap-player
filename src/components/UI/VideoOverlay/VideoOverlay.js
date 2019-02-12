import React,{Component} from 'react';
import videoBackground from '../../../assets/es.mp4';
import classes from './VideoOverlay.css';


class VideoOverlay extends Component {
    state = {
        hidden: false
    };

    videoEndHandler = ()=>{
        this.setState({hidden: true});
        let video = document.getElementById("backgroundVideo");

        setTimeout(()=>{
            this.setState({hidden: false});
            video.play();
        },180000)
    };

    render() {
        return(
            <div className={classes.VideoOverlay+" "+(this.state.hidden ? classes.Hidden : null)}>
                <video id="backgroundVideo" onEnded={this.videoEndHandler} autoPlay muted>
                    <source src={videoBackground} type="video/mp4" />
                </video>
            </div>
        );
    }

};

export default VideoOverlay;