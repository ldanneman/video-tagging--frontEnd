import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState } from "react";
import { VideoProvider } from "./library/Context";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage";
import err404 from "./pages/err404";
import err500 from "./pages/err500";
import EyeKnowLanding from "./pages/EyeKnowLanding";
import Admin from "./pages/Admin";
import SignedIn from "./pages/SignedIn";
import Nav from "./components/Nav";
import eyeknow from "./assets/Images/static1.squarespace.png";

function App() {
  const token = localStorage.getItem("auth-token");
  const [videoList, setVideoList] = useState(null);
  const [IsLoading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [playerState, setPlayerState] = useState({
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
