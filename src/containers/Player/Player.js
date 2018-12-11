import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classes from './Player.css';
import PlayerContent from '../PlayerContent/PlayerContent';
import videoBackground from '../../assets/bg.mp4';
import sizeMe from 'react-sizeme';
import Confetti from 'react-confetti';


const DimensionedExample = sizeMe({
    monitorHeight: true,
    monitorWidth: true,
  })(class Player extends PureComponent {
    static propTypes = {
        size: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }

    state = {};

    render() {
        return(
            <div className={classes.Player}>
                <PlayerContent />
                <Confetti {...this.props.size}  numberOfPieces={30} />
                <video id="background-video" loop autoPlay muted>
                    <source src={videoBackground} type="video/mp4" />
                </video>
            </div>
        );
    }
})

export default DimensionedExample;