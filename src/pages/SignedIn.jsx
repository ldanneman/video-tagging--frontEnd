import React, { useState, useEffect, useContext } from "react";
import { VideoContext } from "../library/Context";
import axios from "axios";
import { BACK_PORT } from "../var";
import Loader from "../components/Loader";
import eyeknow from "../assets/Images/static1.squarespace.png";
import { useHistory } from "react-router-dom";

function SignedIn() {
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
  const [error, setError] = useState(null);

  const token = localStorage.getItem("auth-token");
  const userInfo = localStorage.getItem("user-info").split(",");
  console.log("User Info", userInfo);
  const params = {
    Bucket: userInfo[5],
    Prefix: userInfo[6],
    Delimiter: userInfo[7],
  };

  useEffect(() => {
    axios
      .post(`${BACK_PORT}/videos/get-videos`, params, {
        headers: { "user-info": token },
      })
      .then(function (response) {
        if (response.data.length == 0) {
          setError("theError");
        } else {
          let videos = response.data.map((item, index) => {
            let lastMp4 = new RegExp(/mp4(?!.*mp4)/);
            let fileName = encodeURI(response.data[index]);
            let s3Path = `${fileName.split("com/")[1].split(lastMp4)[0]}mp4`;
            return {
              path: item,
              id: index,
              file_name: fileName,
              s3_path: s3Path,
              raw_file_id: null,
              duration: null,
              classifier_id: 0,
              user_status: 1,
              flag: null,
              comments: null,
              date: null,
            };
          });
          setVideoList(videos);
          setCurrentVideo(videos[0]);
        }
      })
      .catch(function (error) {
        setError(error?.response?.data ?? "the error");
      });
  }, []);

  return videoList && currentVideo ? (
    <>
      <div className="SignedIn">Signed In Page</div>
    </>
  ) : (
    <Loader />
  );
}

export default SignedIn;
