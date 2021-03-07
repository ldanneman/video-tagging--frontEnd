import React, { useContext, createRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { VideoContext } from "../library/Context";
import TestButtons from "./InteractionButtons";
import styles from "../styles/VideoPlayer.module.css";
import RatingBtns from "./RatingBtns.js";

function VideoPlayer() {
  const {
    currentVideo,
    setCurrentVideo,
    setVideoList,
    videoList,
    IsLoading,
    setLoading,
  } = useContext(VideoContext);

  const [playerState, setPlayerState] = useState({
    url: currentVideo.path,
    pip: false,
    playing: false,
    controls: true,
    light: false,
    muted: true,
    played: 0,
    loaded: 0,
    duration: 0,
    loop: false,
    autoPlay: true,
    seeking: false,
  });

  const getCurrentVideoIndex = () => {
    const wholeVideo = videoList.length;
    return `${currentVideo.id}/${wholeVideo} has been reviewed`;
  };

  useEffect(() => {
    setPlayerState({ ...playerState, url: currentVideo.path });
  }, [currentVideo]);

  return (
    <div className={styles.playerDivWrapper}>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          url={playerState.url}
          controls={playerState.controls}
          playing={playerState.playing}
          muted={playerState.muted}
        />
        <div>{getCurrentVideoIndex()}</div>

        <TestButtons
          playerState={playerState}
          currentVideo={currentVideo}
          videoList={videoList}
          setCurrentVideo={setCurrentVideo}
          setVideoList={setVideoList}
          setPlayerState={setPlayerState}
        />
        <RatingBtns
          videoList={videoList}
          currentVideo={currentVideo}
          setVideoList={setVideoList}
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
