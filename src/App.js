import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";

import { VideoProvider } from "./library/Context.js";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { BACK_PORT } from "./var";

const LOCAL_PORT = `http://localhost:5000/api`;

const videos = [
  {
    path: "https://www.youtube.com/watch?v=jhFDyDgMVUI",
    id: 9000,
    isAggressive: false,
  },
  {
    path: "https://www.youtube.com/watch?v=IhEUzFFrp7c",
    id: 2,
    isAggressive: false,
  },
  {
    path: "https://www.youtube.com/watch?v=PZY-hB2C_Iw",
    id: 3,
    isAggressive: false,
  },
  {
    path: "https://www.youtube.com/watch?v=gCSygYfv3X0",
    id: 4,
    isAggressive: false,
  },
  {
    path: "https://www.youtube.com/watch?v=UFTOkC2XNjQ",
    id: 5,
    isAggressive: false,
  },
  {
    path: "https://www.youtube.com/watch?v=NIk1-ck4c6Q",
    id: 6,
    isAggressive: false,
  },
  {
    path: "https://www.youtube.com/watch?v=D2o6MDpL1v0",
    id: 7,
    isAggressive: false,
  },
  {
    path: "https://www.youtube.com/watch?v=Tsy4T6yb190",
    id: 8,
    isAggressive: false,
  },
];

function App() {
  const [videoList, setVideoList] = useState(null);
  const [IsLoading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACK_PORT}/videos` || `${LOCAL_PORT}/videos`)
      .then(function (response) {
        console.log("response", response);
        console.log("data", response.data);
        let videos2 = response.data.map((item, index) => {
          return { path: item, id: index, isAggressive: true };
        });
        console.log("ggg", videos2[0].path);
        setVideoList(videos2);
        setCurrentVideo(videos2[0]);
      })
      .catch(function (error) {});
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
      }}
    >
      {console.log("www", videoList[0])}
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={HomePage} />
            <Route path="/review" component={ReviewPage} />
          </Switch>
        </Router>
      </div>
    </VideoProvider>
  ) : (
    <div>Loading</div>
  );
}

export default App;
