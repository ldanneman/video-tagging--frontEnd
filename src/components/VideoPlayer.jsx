import React, { useContext, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { VideoContext } from "../library/Context";
import TestButtons from "./InteractionButtons";
import styles from "../styles/VideoPlayer.module.css";
import RatingBtns from "./RatingBtns.js";
import axios from "axios";
import { BACK_PORT } from "../var";
import { Button } from "antd";
// import { DownloadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import download from "../assets/video/Circle-Loading-Animation.mp4";
import eyeknow from "../assets/Images/static1.squarespace.png";

function VideoPlayer() {
  const {
    currentVideo,
    setCurrentVideo,
    setVideoList,
    videoList,
    IsLoading,
    setLoading,
    playerState,
    setPlayerState,
  } = useContext(VideoContext);

  // const [playerState, setPlayerState] = useState({
  //   // url: currentVideo.path,
  //   url: currentVideo.path,
  //   urlUnloaded: "nothing.mp4",
  //   pip: false,
  //   playing: true,
  //   controls: true,
  //   light: false,
  //   muted: true,
  //   played: 0,
  //   loaded: 0,
  //   duration: 0,
  //   loop: false,
  //   autoPlay: true,
  //   seeking: false,
  //   downloaded: null,
  //   poster: eyeknow,
  // });
  const lastMp4 = new RegExp(/mp4(?!.*mp4)/);
  let encoded = encodeURI(currentVideo.path);
  const thevideo = `${BACK_PORT}/videos/stream?path=Assets/Videos/FV/${encoded
    .split("com/")[1]
    .split(lastMp4)[0]
    .replaceAll("/", "-")}mp4`;

  const getCurrentVideoIndex = () => {
    const wholeVideo = videoList.length;
    return `${currentVideo.id + 1}/${wholeVideo} have been reviewed`;
  };

  useEffect(() => {
    setLoading(true);
    setPlayerState({ ...playerState, downloaded: null, urlUnloaded: download });
    axios
      .post(`${BACK_PORT}/videos/download`, currentVideo)
      .then(function (response) {
        if (response.data) {
          setPlayerState({ ...playerState, downloaded: true });
          setLoading(false);
        } else {
          console.log("waiting...");
        }
        // console.log(response.data);
      })
      .catch(function (error) {
        Swal.fire("Oops...", error?.response?.data, "error");
      });
  }, [currentVideo]);

  // const post = () => {
  //   setLoading(true);
  //   setPlayerState({ ...playerState, urlUnloaded: download });
  //   console.log("9999", playerState.url);
  //   axios
  //     .post(`${BACK_PORT}/videos/download`, videoList)
  //     .then(function (response) {
  //       if (response.data) {
  //         setPlayerState({ ...playerState, downloaded: true });
  //         setLoading(false);
  //       } else {
  //         console.log("waiting...");
  //       }
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       Swal.fire("Oops...", error?.response?.data, "error");
  //     });
  // };

  const onDelete = () => {
    axios
      .post(`${BACK_PORT}/videos/deletefv`, videoList)
      .then(function (response) {
        Swal.fire(response?.data);
      })
      .catch(function (error) {
        Swal.fire("Oops...", error?.response?.data, "error");
      });
  };

  return (
    <div className={styles.playerDivWrapper}>
      <div className={styles.playerWrapper}>
        {/* <Button
          className={styles.downloadButton}
          icon={<DownloadOutlined />}
          onClick={post}
          loading={IsLoading}
        >
          Download/Play Videos
        </Button> */}
        <Button onClick={onDelete}>Delete Videos</Button>
        <ReactPlayer
          className={styles.reactPlayer}
          url={playerState.downloaded ? thevideo : playerState.urlUnloaded}
          controls={playerState.downloaded ? true : false}
          playing={playerState.playing}
          muted={playerState.muted}
          autoPlay={playerState.autoPlay}
          loop={playerState.downloaded ? false : true}
          config={{
            file: {
              attributes: {
                poster: playerState.poster,
              },
            },
          }}
        />
        <div>{getCurrentVideoIndex()}</div>

        <TestButtons
          playerState={playerState}
          currentVideo={currentVideo}
          videoList={videoList}
          setCurrentVideo={setCurrentVideo}
          setVideoList={setVideoList}
          setPlayerState={setPlayerState}
          setLoading={setLoading}
          IsLoading={IsLoading}
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
