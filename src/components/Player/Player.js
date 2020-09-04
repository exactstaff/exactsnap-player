import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classes from "./Player.css";
import PlayerContent from "../PlayerContent/PlayerContent";
import ScrollingFooter from "../ScrollingFooter/ScrollingFooter";
import videoBackground from "../../assets/bg.mp4";
import sizeMe from "react-sizeme";
import Confetti from "react-confetti";
// import VideoOverlay from "../VideoOverlay/VideoOverlay";

const DimensionedExample = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(
  class Player extends PureComponent {
    static propTypes = {
      size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    };

    render() {
      return (
        <div className={classes.Player}>
          {/* <VideoOverlay /> */}
          <PlayerContent />
          <ScrollingFooter />
          <Confetti {...this.props.size} numberOfPieces={30} />
          <video id="background-video" loop autoPlay muted>
            <source src={videoBackground} type="video/mp4" />
          </video>
        </div>
      );
    }
  }
);

export default DimensionedExample;
