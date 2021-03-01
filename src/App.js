import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState } from "react";

import { VideoProvider } from "./library/Context.js";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage";

const videos = [
  {
    path: "https://www.facebook.com/sann.jones.galbraith/videos/10158700587661827/",
    id: 1,
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
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [videoList, setVideoList] = useState(videos);
  const [IsLoading, setLoading] = useState(false);

  return (
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
  );
}

export default App;
