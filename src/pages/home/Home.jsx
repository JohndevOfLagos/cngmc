import React from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import AppLogo from "Assets/image/CONG_Official_Logo.png";

import MilVideo from "Assets/MilVideo/Colorado National Guard Mission Video.mp4";

import "./Home.scss";

// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDsX2DYBMGmRAudDb6olsN-xt6H9YZjyYA",
//   authDomain: "registerationcardguard.firebaseapp.com",
//   projectId: "registerationcardguard",
//   storageBucket: "registerationcardguard.appspot.com",
// };

// const app = initializeApp(firebaseConfig);

export const Home = () => {
  const navigate = useNavigate();
  // const auth = getAuth(app);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  const loginHandler = () => {
    navigate("/login")
  }
  const signupHandler = () => {
    navigate("/user/signup/Account")
  }

  return (
    <main className="Main_Home__Section">
      <video autoPlay loop muted className="video">
        <source src={MilVideo} />
      </video>
      <div className="Main_Home__Section__inner">
        <div className="BrandLogo">
          <img src={AppLogo} alt="" />
        </div>
        <div className="card">
          <div className="card-info">
            <h1>Welcome! </h1>
            <div className="card-info_readme">
              <span>
                Submit your personal details for the Colorado National Guard
                Membership Card.
              </span>
              <span>
                Filling out the Online form is the first step in the process of
                registration.
              </span>
              <span>
                You will still need to complete your registration where we
                revive your Application information for a Membership Card.
              </span>
              <span>Before Starting: (Review)</span>
              <div className="direction">
                <Link className="direction-link">
                  <span>
                    1. How to fill the registration form{" "}
                    <Icon icon="mingcute:external-link-fill" />
                  </span>
                </Link>
                <Link className="direction-link">
                  <span>
                    2. List of documents you will need{" "}
                    <Icon icon="mingcute:external-link-fill" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="login-signup-page">
          <div className="signup-wrapper">
            <button className="signup__btn" onClick={signupHandler}>New Registration</button>
          </div>
          <div className="login-wrapper">
            <button className="login__btn" onClick={loginHandler}>Login</button>
          </div>
        </div>
      </div>
    </main>
  );
};
