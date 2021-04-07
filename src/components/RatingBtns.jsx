// components for Tagging options Not-aggressive (default - auto-selected) & Aggressive
// API details can be found here https://ant.design/components/button/#API

import React, { useEffect, useRef, useContext } from "react";
import { Button } from "antd";
import styles from "../styles/ratingBtns.module.css";
import axios from "axios";
import { BACK_PORT } from "../var";
import Swal from "sweetalert2";
import { VideoContext } from "../library/Context";

const RatingBtns = () => {
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
  const aggressive = () => {
    setVideoList([
      ...videoList,
      (videoList[videoList.indexOf(currentVideo)].flag = true),
    ]);
    // setCurrentVideo(...currentVideo, (currentVideo.flag = true));
  };

  const notAggressive = () => {
    setVideoList([
      ...videoList,
      (videoList[videoList.indexOf(currentVideo)].flag = false),
    ]);
  };

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      axios
        .post(`${BACK_PORT}/videos/tag`, currentVideo)
        .then(function (response) {
          console.log("good response", response?.data);
        })
        .catch(function (error) {
          console.log("bad response", error?.response?.data);
          Swal.fire("Oops...", error?.response?.data, "error");
        });
    } else {
      isMounted.current = true;
    }
  }, [videoList]);

  // useEffect(() => {}, [currentVideo]);

  return (
    <div className={styles.ratingBtnsWrapper}>
      <Button type="primary" shape="round" onClick={notAggressive}>
        Not Aggressive
      </Button>
      <Button type="primary" danger={true} shape="round" onClick={aggressive}>
        Aggressive
      </Button>
    </div>
  );
};

export default RatingBtns;
