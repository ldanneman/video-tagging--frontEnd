import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import { VideoProvider } from "./library/Context";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage";
import err404 from "./pages/err404";
import err500 from "./pages/err500";
import EyeKnowLanding from "./pages/EyeKnowLanding";
import Admin from "./pages/Admin";
import SignedIn from "./pages/SignedIn";
import Nav from "./components/Nav";
import axios from "axios";
import { BACK_PORT } from "./var";
import Loader from "./components/Loader";
import eyeknow from "./assets/Images/static1.squarespace.png";
import { useHistory } from "react-router-dom";

function App() {
  const token = localStorage.getItem("auth-token");
  // let history = useHistory();
  const [videoList, setVideoList] = useState(null);
  const [IsLoading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  // const [error, setError] = useState(null);

  const [playerState, setPlayerState] = useState({
    // url: currentVideo.path,
    url: currentVideo?.path,
    urlUnloaded: "nothing.mp4",
    pip: false,
    playing: true,
    controls: true,
    light: false,
    muted: true,
    played: 0,
    loaded: 0,
    duration: 0,
    loop: false,
    autoPlay: true,
    seeking: false,
    downloaded: null,
    poster: eyeknow,
  });

  // useEffect(() => {
  //   axios
  //     .get(`${BACK_PORT}/videos`, {
  //       headers: { "user-info": token },
  //     })
  //     .then(function (response) {
  //       if (response.data.length == 0) {
  //         setError("theError");
  //       } else {
  //         let videos = response.data.map((item, index) => {
  //           let lastMp4 = new RegExp(/mp4(?!.*mp4)/);
  //           let fileName = encodeURI(response.data[index]);
  //           let s3Path = `${fileName.split("com/")[1].split(lastMp4)[0]}mp4`;
  //           return {
  //             path: item,
  //             id: index,
  //             file_name: fileName,
  //             s3_path: s3Path,
  //             raw_file_id: null,
  //             duration: null,
  //             classifier_id: 0,
  //             user_status: 1,
  //             flag: null,
  //             comments: null,
  //             date: null,
  //           };
  //         });
  //         setVideoList(videos);
  //         setCurrentVideo(videos[0]);
  //       }
  //     })
  //     .catch(function (error) {
  //       setError(error?.response?.data ?? "the error");
  //     });
  // }, []);

  return token ? (
    <VideoProvider
      value={{
        currentVideo,
        setCurrentVideo,
        videoList,
        setVideoList,
        IsLoading,
        setLoading,
        playerState,
        setPlayerState,
      }}
    >
      <div className="app">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/signedin" />} />
            <Route path="/home" render={() => <Redirect to="/signedin" />} />
            <Route path="/signedin" component={SignedIn} />
            <Route path="/review" component={ReviewPage} />
            <Route path="/Admin" component={Admin} />
            <Route path="/ekl" component={EyeKnowLanding} />
            <Route path="/serverdown" component={err500} />
            <Route component={err404} />
            {/* <Route path="/test" component={Test} /> */}
          </Switch>
        </Router>
      </div>
    </VideoProvider>
  ) : (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={HomePage} />
          <Route component={err404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
