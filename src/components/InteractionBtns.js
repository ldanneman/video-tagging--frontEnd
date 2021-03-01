// components for Interaction buttons: Play/pause button, Replay button , Skip buttons (backwards, forwards)
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/InteractionBtns.module.css";
import { VideoContext } from "../library/Context";

const InteractionBtns = ({ player, playerState, setPlayerState }) => {
  const { currentVideo, setCurrentVideo, videoList } = useContext(VideoContext);
  const handlePlay = () => {
    console.log("onPlay");
    setPlayerState({ ...playerState, playing: true });
  };

  const handlePause = () => {
    console.log("onPause");
    setPlayerState({ ...playerState, playing: false });
  };

  const handleReplay = () => {
    player.current.seekTo(0);
    setPlayerState({ ...playerState, playing: true });
  };

  const handleForward = () => {
    player.current.seekTo(playerState.playedSeconds + 5);
  };

  const handleBackward = () => {
    player.current.seekTo(playerState.playedSeconds - 5);
  };

  const handleNext = () => {
    if (videoList.indexOf(currentVideo) < videoList.length - 1) {
      setCurrentVideo(videoList[videoList.indexOf(currentVideo) + 1]);
    } else {
      alert("This is the last video");
    }
  };

  const handleLast = () => {
    if (videoList.indexOf(currentVideo) === 0) {
      alert("This is the first video");
    } else {
      setCurrentVideo(videoList[videoList.indexOf(currentVideo) - 1]);
    }
  };

  return (
    <div className={styles.btnsWarpper}>
      <FontAwesomeIcon
        icon={["fas", "fast-backward"]}
        size="1x"
        onClick={handleLast}
      />
      <FontAwesomeIcon
        icon={["fas", "backward"]}
        size="1x"
        onClick={handleBackward}
      />
      {playerState.playing ? (
        <FontAwesomeIcon
          icon={["far", "pause-circle"]}
          size="1x"
          onClick={handlePause}
        />
      ) : (
        <FontAwesomeIcon
          icon={["far", "play-circle"]}
          size="1x"
          onClick={handlePlay}
        />
      )}

      <FontAwesomeIcon icon={["fas", "redo"]} size="1x" onClick={handleReplay} />
      <FontAwesomeIcon
        icon={["fas", "forward"]}
        size="1x"
        onClick={handleForward}
      />
      <FontAwesomeIcon
        icon={["fas", "fast-forward"]}
        size="1x"
        onClick={handleNext}
      />
    </div>
  );
};

export default InteractionBtns;
