import React, { useContext, createRef, useState, useEffect } from "react";
import { Table, Select, Typography } from "antd";
import ReactPlayer from "react-player";
import styles from "../styles/VideoPlayer.module.css";
import { VideoContext } from "../library/Context";
import InteractionBtns from "./InteractionBtns";
import RatingBtns from "./RatingBtns";
import Loader from "./Loader";

const { Option } = Select;
const speedList = [0.5, 1, 1.5, 2, 2.5, 3];
const { Title } = Typography;

const VideoPlayer = () => {
  const player = createRef();
  const {
    currentVideo,
    setCurrentVideo,
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
    playbackRate: speedList[1],
    loop: false,
    autoPlay: true,
    seeking: false,
  });

  useEffect(() => {
    setPlayerState({ ...playerState, url: currentVideo.path });
  }, [currentVideo, playerState]);

  const getCurrentVideoIndex = () => {
    const wholeVideo = videoList.length;
    return `${currentVideo.id}/${wholeVideo} has been reviewed`;
  };

  const handleEnded = () => {
    if (playerState.loop && player.current.loopOnEnded) {
      player.current.seekTo(0);
    } else if (videoList.indexOf(currentVideo) < videoList.length - 1) {
      setCurrentVideo(videoList[videoList.indexOf(currentVideo) + 1]);
    }
    setPlayerState({ ...playerState, playing: playerState.loop });
  };

  const handleSeekMouseDown = () => {
    setPlayerState({ ...playerState, seeking: true, playing: false });
  };

  const handleSeekChange = (e) => {
    setPlayerState({ ...playerState, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setPlayerState({ ...playerState, seeking: false, playing: true });
    player.current.seekTo(parseFloat(playerState.played));
  };

  const handleProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!playerState.seeking) {
      console.log("onProgress", state);
      setPlayerState({ ...playerState, ...state });
    }
  };

  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    setPlayerState({ ...playerState, duration });
  };

  const onChangeSpeed = (value) => {
    setPlayerState({ ...playerState, playbackRate: value });
  };

  const handleBuffering = () => {
    console.log("onBuffer");
    setLoading(true);
  };

  const handleOnPlay = () => {
    console.log("onPlay");
    setLoading(false);
  };

  const dataSource = [
    {
      key: "1",
      played: `${parseFloat(
        playerState.duration * playerState.played * 1
      ).toFixed(0)} seconds`,
      remaining: `${parseFloat(
        playerState.duration * (1 - playerState.played)
      ).toFixed(0)} seconds`,
      total_length: `${parseFloat(playerState.duration).toFixed(0)} seconds`,
    },
  ];

  const columns = [
    {
      title: "Played",
      dataIndex: "played",
      key: "played",
    },
    {
      title: "Remaining",
      dataIndex: "remaining",
      key: "remaining",
    },

    {
      title: "Total Length",
      dataIndex: "total_length",
      key: "total_length",
    },
  ];

  return (
    <div className={styles.playerDivWrapper}>
      <div className={styles.ratingTitleWrapper}>
        <Title>Review Video</Title>
        <Title className={styles.rattingSubtitle} level={5}>
          {currentVideo.path}
        </Title>
      </div>
      {IsLoading && <Loader />}
      <div className={styles.contents}>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            width="60%"
            height="60%"
            ref={player}
            playing={playerState.playing}
            className={styles.reactPlayer}
            url={playerState.url}
            controls={playerState.controls}
            loop={playerState.loop}
            light={playerState.light}
            playbackRate={playerState.playbackRate}
            muted={playerState.muted}
            pip={playerState.pip}
            onReady={() => console.log("onReady")}
            onPlay={handleOnPlay}
            autoPlay={playerState.autoPlay}
            onSeek={(e) => console.log("onSeek", e)}
            onBuffer={handleBuffering}
            onError={(e) => console.log("onError", e.target.error)}
            onEnded={handleEnded}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
        </div>

        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={playerState.played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          onTouchStart={handleSeekMouseDown}
          onTouchMove={handleSeekChange}
          onTouchEnd={handleSeekMouseUp}
        />

        <Table dataSource={dataSource} columns={columns} pagination={false} />

        <div className={styles.indexAndSpeedWrapper}>
          <div>{getCurrentVideoIndex()}</div>

          <Select
            onChange={onChangeSpeed}
            style={{ width: 150 }}
            placeholder="Player speed"
            bordered={false}
          >
            {speedList.map((speed) => {
              return (
                <Option key={speed} value={speed}>
                  {speed}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div className={styles.btnsWrapper}>
        <InteractionBtns
          player={player}
          playerState={playerState}
          setPlayerState={setPlayerState}
        />

        <RatingBtns />
      </div>
    </div>
  );
};

export default VideoPlayer;
