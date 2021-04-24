import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { VideoContext } from "../library/Context";
import TestButtons from "./InteractionButtons";
import styles from "../styles/VideoPlayer.module.css";
import RatingBtns from "./RatingBtns";
import axios from "axios";
import { BACK_PORT } from "../var";
import { Button } from "antd";
// import { DownloadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import download from "../assets/video/Circle-Loading-Animation.mp4";
import eyeknow from "../assets/Images/static1.squarespace.png";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";

function VideoPlayer() {
  let history = useHistory();
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
  const [check, setCheck] = useState(null);

  const token = localStorage.getItem("auth-token");

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
    console.log("CURRENT VIDEO", currentVideo);
    setLoading(true);
    setPlayerState({ ...playerState, downloaded: null, urlUnloaded: download });
    axios
      .post(`${BACK_PORT}/videos/download`, currentVideo, {
        headers: { "auth-token": token },
      })
      .then(function (response) {
        if (response.data) {
          setPlayerState({ ...playerState, downloaded: true });
          setLoading(false);
          setCheck(response?.status);
        } else {
          console.log("waiting...");
        }
      })
      .catch(function (error) {
        setCheck(error?.response?.status || "theError");
      });
  }, [currentVideo]);

  if (check) {
    return check == 200 ? (
      <div className={styles.playerDivWrapper}>
        <div className={styles.playerWrapper}>
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
          {/* <RatingBtns
          videoList={videoList}
          currentVideo={currentVideo}
          setVideoList={setVideoList}
          setCurrentVideo={setCurrentVideo}
        /> */}
        </div>
      </div>
    ) : (
      <div>{history.push("/err404")}</div>
    );
  } else {
    return <div>{<Loader />}</div>;
  }
}

export default VideoPlayer;
