import { Spin } from "antd";
import React from "react";

import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Spin className={styles.loader} size="large" />
    </div>
  );
};

export default Loader;
