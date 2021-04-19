import React from "react";
// import background from "../assets/video/preschool.mp4";
import styles from "../styles/HomePageStyle.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const background =
    "https://res.cloudinary.com/coolps811/video/upload/v1616604340/ot5llnfttqqggroq8wlx.mp4";
  return (
    <div className={styles.Container}>
      <video autoPlay loop muted className={styles.Video}>
        <source src={background} type="video/mp4" />
      </video>

      <div className={styles.Content}>
        <div className={styles.innerContent}></div>
        <div className={styles.SubContent}>
          <h1>EyeKnow</h1>
          <p>
            Putting an eye on things<br></br> we don't know!
          </p>
          <Link
            style={{
              marginTop: "60%",
              color: "#f1f1f1",
              fontWeight: "bold",
              border: "#f1f1f1 1px solid",
              padding: "10px 5px",
              backgroundColor: "hsla(0, 0%, 0%, 0)",
              fontSize: "1.25rem",
              borderRadius: "5px",
            }}
            to="/review/"
          >
            Start Tagging
          </Link>
          <div>{/* <SignUp /> */}</div>
          <div>{/* <LogIn /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
