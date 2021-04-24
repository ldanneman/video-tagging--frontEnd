import React, { useEffect } from "react";
import axios from "axios";
import { BACK_PORT } from "../var";

function Files() {
  const userInfo = localStorage.getItem("user-info")?.split(",");
  const initialLocation = {
    Bucket: userInfo[4],
    Prefix: "",
    Delimiter: "/",
  };
  useEffect(() => {
    axios
      .post(`${BACK_PORT}/videos/testing2`, userInfo[4], {
        headers: { "auth-token": "token" },
      })
      .then(function (response) {})
      .catch(function (error) {});
  }, []);
  return <div>This is the file Component</div>;
}

export default Files;
