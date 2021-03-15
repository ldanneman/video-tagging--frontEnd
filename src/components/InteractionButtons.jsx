import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/InteractionBtns.module.css";
import { VideoContext } from "../library/Context";
import { Button } from "antd";

function InteractionButtons({ player, playerState, setPlayerState }) {
  const { currentVideo, setCurrentVideo, videoList, setVideoList } = useContext(
    VideoContext
  );

  const nextVideo = () => {
    if (videoList.indexOf(currentVideo) < videoList.length - 1) {
      setCurrentVideo(videoList[videoList.indexOf(currentVideo) + 1]);
    } else {
      alert("This is the last video");
    }
  };

  const prevVideo = () => {
    if (videoList.indexOf(currentVideo) === 0) {
      alert("This is the first video");
    } else {
      setCurrentVideo(videoList[videoList.indexOf(currentVideo) - 1]);
    }
  };

  const play = () => {
    setPlayerState({ ...playerState, playing: true });
  };

  const pause = () => {
    setPlayerState({ ...playerState, playing: false });
  };
  const replay = () => {
    player.current.seekTo(0);
    setPlayerState({ ...playerState, playing: true });
  };

  return (
    playerState && (
      <div>
        <div className={styles.btnsWarpper}>
          <Button className={styles.button}>
            <FontAwesomeIcon
              icon={["fas", "fast-backward"]}
              size="1x"
              onClick={prevVideo}
            />
          </Button>
          {/* <Button>
            <FontAwesomeIcon icon={["fas", "backward"]} size="1x" />
          </Button> */}
          {playerState.playing ? (
            <Button className={styles.button}>
              <FontAwesomeIcon
                icon={["far", "pause-circle"]}
                size="1x"
                onClick={pause}
              />
            </Button>
          ) : (
            <Button className={styles.button}>
              <FontAwesomeIcon
                icon={["far", "play-circle"]}
                size="1x"
                onClick={play}
              />
            </Button>
          )}
          <Button className={styles.button}>
            <FontAwesomeIcon
              icon={["fas", "redo"]}
              size="1x"
              onClick={replay}
            />
          </Button>
          {/* <Button>
            <FontAwesomeIcon icon={["fas", "forward"]} size="1x" />{" "}
          </Button> */}
          <Button className={styles.button}>
            <FontAwesomeIcon
              icon={["fas", "fast-forward"]}
              size="1x"
              onClick={nextVideo}
            />
          </Button>
        </div>
      </div>
    )
  );
}

export default InteractionButtons;
