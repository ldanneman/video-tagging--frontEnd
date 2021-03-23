import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import { VideoProvider } from "./library/Context.js";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage";
import Test from "./pages/Test";
import axios from "axios";
import { BACK_PORT } from "./var";
import Loader from "./components/Loader";
import eyeknow from "./assets/Images/static1.squarespace.png";

const LOCAL_PORT = `http://localhost:5000/api`;

function App() {
  const [videoList, setVideoList] = useState(null);
  const [IsLoading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

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

  useEffect(() => {
    axios
      .get(`${BACK_PORT}/videos`)
      // .get(`${BACK_PORT}/videos` || `${LOCAL_PORT}/videos`)
      .then(function (response) {
        let videos2 = response.data.map((item, index) => {
          return {
            path: item,
            id: index,
            isAggressiveInternal: null,
            isAggrressiveExternal: null,
          };
        });
        setVideoList(videos2);
        setCurrentVideo(videos2[0]);
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);

  console.log("uuu", videoList);
  return videoList && currentVideo ? (
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
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={HomePage} />
            <Route path="/review" component={ReviewPage} />
            <Route path="/test" component={Test} />
          </Switch>
        </Router>
      </div>
    </VideoProvider>
  ) : (
    <Loader />
  );
}

export default App;
