import React, { useContext, useRef } from "react";
import videoBackground from "../../assets/es.mp4";
import classes from "./VideoOverlay.css";
import { PlayerContext } from "../../context/PlayerContext";

const VideoOverlay = () => {
  const [playerState, setPlayerState] = useContext(PlayerContext);

  const video = useRef();

  const videoEndHandler = () => {
    setPlayerState({ paused: false });

    setTimeout(() => {
      setPlayerState({ paused: true });
      video.current.play();
    }, 6000);
  };

  return (
    <div
      className={
        classes.VideoOverlay +
        " " +
        (!playerState.paused ? classes.Hidden : null)
      }
    >
      <video
        id="backgroundVideo"
        onEnded={videoEndHandler}
        autoPlay
        muted
        ref={video}
      >
        <source src={videoBackground} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoOverlay;
