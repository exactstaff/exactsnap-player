import React, {Component} from 'react';
import classes from './Player.css';
import PlayerContent from '../PlayerContent/PlayerContent';
import videoBackground from '../../assets/bg.mp4';

class Player extends Component {
    state = {};

    render() {
        return(
            <div className={classes.Player}>
                <PlayerContent />
                <video id="background-video" loop autoPlay>
                    <source src={videoBackground} type="video/mp4" />
                </video>
            </div>
        );
    }
}

export default Player;