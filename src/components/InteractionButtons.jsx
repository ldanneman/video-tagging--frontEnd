import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/InteractionBtns.module.css";
import { VideoContext } from "../library/Context";
import { Button } from "antd";
import axios from "axios";
import { BACK_PORT } from "../var";
import Swal from "sweetalert2";
import download from "../assets/video/loading-overlay.mp4";

function InteractionButtons({ player, playerState, setPlayerState }) {
  const {
    currentVideo,
    setCurrentVideo,
    videoList,
    setVideoList,
    setLoading,
    IsLoading,
  } = useContext(VideoContext);

  const [test, setTest] = useState(1);

  const nextVideo = () => {
    // setPlayerState({ ...playerState, downloaded: null, urlUnloaded: download });
    if (videoList.indexOf(currentVideo) < videoList.length - 1) {
      setCurrentVideo(videoList[videoList.indexOf(currentVideo) + 1]);
      // setLoading(true);
      // setPlayerState({ ...playerState, urlUnloaded: download });
      // setTest(test + 1);
      // axios
      //   .post(`${BACK_PORT}/videos/download`, {
      //     url: videoList[videoList.indexOf(currentVideo) + 1],
      //   })
      //   .then(function (response) {
      //     if (response.data) {
      //       setPlayerState({ ...playerState, downloaded: true });
      //       setLoading(false);
      //     } else {
      //       console.log("waiting...");
      //     }
      //     console.log(response.data);
      //   })
      //   .catch(function (error) {
      //     Swal.fire("Oops...", error?.response?.data, "error");
      //   });
    } else {
      alert("This is the last video");
    }
  };

  // useEffect(() => {}, [test]);

  const prevVideo = () => {
    if (videoList.indexOf(currentVideo) === 0) {
      alert("This is the first video");
    } else {
      setCurrentVideo(videoList[videoList.indexOf(currentVideo) - 1]);
    }
  };

  const play = () => {
    setPlayerState({ ...playerState, playing: true });
  };

  const pause = () => {
    setPlayerState({ ...playerState, playing: false });
  };
  const replay = () => {
    player.current.seekTo(0);
    setPlayerState({ ...playerState, playing: true });
  };

  return (
    playerState && (
      <div>
        <div className={styles.btnsWarpper}>
          <Button className={styles.button}>
            <FontAwesomeIcon
              icon={["fas", "fast-backward"]}
              size="1x"
              onClick={prevVideo}
            />
          </Button>
          {/* <Button>
            <FontAwesomeIcon icon={["fas", "backward"]} size="1x" />
          </Button> */}
          {playerState.playing ? (
            <Button className={styles.button}>
              <FontAwesomeIcon
                icon={["far", "pause-circle"]}
                size="1x"
                onClick={pause}
              />
            </Button>
          ) : (
            <Button className={styles.button}>
              <FontAwesomeIcon
                icon={["far", "play-circle"]}
                size="1x"
                onClick={play}
              />
            </Button>
          )}
          <Button className={styles.button}>
            <FontAwesomeIcon
              icon={["fas", "redo"]}
              size="1x"
              onClick={replay}
            />
          </Button>
          {/* <Button>
            <FontAwesomeIcon icon={["fas", "forward"]} size="1x" />{" "}
          </Button> */}
          <Button className={styles.button}>
            <FontAwesomeIcon
              icon={["fas", "fast-forward"]}
              size="1x"
              onClick={nextVideo}
            />
          </Button>
        </div>
      </div>
    )
  );
}

export default InteractionButtons;
