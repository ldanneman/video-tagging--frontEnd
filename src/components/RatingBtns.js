// components for Tagging options Not-aggressive (default - auto-selected) & Aggressive
// API details can be found here https://ant.design/components/button/#API

import React, { useEffect } from "react";
import { Button } from "antd";
import styles from "../styles/ratingBtns.module.css";
import axios from "axios";
import { BACK_PORT } from "../var";
import Swal from "sweetalert2";

const RatingBtns = ({
  setVideoList,
  videoList,
  currentVideo,
  setCurrentVideo,
}) => {
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

  useEffect(() => {
    axios
      .post(`${BACK_PORT}/videos/tag`, currentVideo)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        Swal.fire("Oops...", error?.response?.data, "error");
      });
  }, [videoList]);

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
