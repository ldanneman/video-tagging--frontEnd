// components for Tagging options Not-aggressive (default - auto-selected) & Aggressive
// API details can be found here https://ant.design/components/button/#API

import React from "react";
import { Button } from "antd";
import styles from "../styles/ratingBtns.module.css";

const RatingBtns = ({ setVideoList, videoList, currentVideo }) => {
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
