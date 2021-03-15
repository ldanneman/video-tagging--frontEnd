import React, { useContext, createRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { VideoContext } from "../library/Context";
import TestButtons from "./InteractionButtons";
import styles from "../styles/VideoPlayer.module.css";
import RatingBtns from "./RatingBtns.js";
import axios from "axios";
import { BACK_PORT } from "../var";
import Swal from "sweetalert2";

const LOCAL_PORT = `http://localhost:5000/api`;

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
    playing: true,
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

  console.log("rrr", playerState);

  const post = () => {
    console.log("9999", playerState.url);
    axios
      .post(`${LOCAL_PORT}/videos/download`, playerState)
      .then(function (response) {})
      .catch(function (error) {
        Swal.fire("Oops...", error?.response?.data, "error");
      });
  };

  const thevideo = "http://localhost:5000/api/videos/stream";
  return (
    <div className={styles.playerDivWrapper}>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          className={styles.reactPlayer}
          // url={playerState.url}
          url={thevideo}
          controls={playerState.controls}
          playing={playerState.playing}
          muted={playerState.muted}
          autoPlay={playerState.autoPlay}
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
      <button onClick={post}>POST</button>
    </div>
  );
}

export default VideoPlayer;
