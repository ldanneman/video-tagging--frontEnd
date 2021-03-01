// components for Tagging options Not-aggressive (default - auto-selected) & Aggressive
// API details can be found here https://ant.design/components/button/#API

import React from "react";
import Btn from "./Btn";
import styles from "../styles/ratingBtns.module.css"

const RatingBtns = () => {
  const onAggressiveBtnClick = (e) => {
    console.log(e.target.innerText);
  };

  const onNoAggressiveBtnClick = (e) => {
    console.log(e.target.innerText);
  };
  return (
    <div className={styles.ratingBtnsWrapper}>
 
          <Btn
            type="primary"
            danger={true}
            shape="round"
            onClick={onAggressiveBtnClick}
            text={"😠 Aggressive 😠"}
          />
      
          <Btn
            type="primary"
            danger={false}
            shape="round"
            onClick={onNoAggressiveBtnClick}
            text={"😊 Not Aggressive 😊"}
          />
    
    </div>
  );
};

export default RatingBtns;
