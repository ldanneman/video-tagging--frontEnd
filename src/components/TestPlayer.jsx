import React, { useContext, createRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { VideoContext } from "../library/Context";
import TestButtons from "./InteractionButtons";
import styles from "../styles/Test.module.css";

function TestPlayer() {
  const player = createRef();

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


  const aggressive = () => {
    setVideoList(
      ...videoList,
      (videoList[videoList.indexOf(currentVideo)].isAggressiveInternal = true)
    );
  };

  const notAggressive = () => {
    setVideoList(
      ...videoList,
      (videoList[videoList.indexOf(currentVideo)].isAggressiveInternal = false)
    );
  };

  useEffect(() => {
    setPlayerState({ ...playerState, url: currentVideo.path });
  }, [currentVideo]);

  return (
    <div>
      <div>testing 123</div>
      <div>
        <ReactPlayer
          url={playerState.url}
          controls={playerState.controls}
          playing={playerState.playing}
          muted={playerState.muted}
        />
        <TestButtons
          playerState={playerState}
          currentVideo={currentVideo}
          videoList={videoList}
          setCurrentVideo={setCurrentVideo}
          setVideoList={setVideoList}
          setPlayerState={setPlayerState}
        />
      </div>
      <button onClick={aggressive}>Aggressive</button>
      <button onClick={notAggressive}>Not Aggressive</button>
      <div>{getCurrentVideoIndex()}</div>
    </div>
  );
}

export default TestPlayer;
