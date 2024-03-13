import React, { useState } from "react";
import "./ForgetPassword.scss";


import { Icon } from "@iconify/react/dist/iconify";
import { Link } from "react-router-dom/dist/index";

import TestimonieImage2 from "Assets/image/Testimonie-image 2.png";
import Glassdoor from "Assets/image/glassdor-rating.png";

import ForgetPasswordImage from "Assets/icon/forgot_password.svg"
/* NAVIGATIONS */
// import { useNavigate } from "react-router-dom";

// /*  FIREBASE  */

// import { initializeApp } from "firebase/app";
// import { getAuth, 

// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDsX2DYBMGmRAudDb6olsN-xt6H9YZjyYA",
//   authDomain: "registerationcardguard.firebaseapp.com",
//   projectId: "registerationcardguard",
//   storageBucket: "registerationcardguard.appspot.com",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);


// /* END OF FIREBASE*/

export const ForgetPassword = () => {
  const [emailInput, setEmailInput] = useState("");

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };





  // const clearAuthFields = () => {
  //   setEmailInput("");
  // };
  

  // const navigate = useNavigate();

  // function authSignInWithEmail() {
  //   const email = emailInput;


  // }
 


  const forgetPasswordhandler = (event) => {
    event.preventDefault();
    
  };












const isSubmitDisabled = emailInput.trim() === '';


  return (
    <div className="forgetpassword">
      <div className="inner-forgetpassword">
        <div className="forgetpassword-image">
          <img src={ForgetPasswordImage} alt="" />
        </div>

        <form action="" className="forgetpassword-form">
          <h2>Forgot Password</h2>
          <div className="forgetpassword-group">
            <input
              required
              id="email"
              type="email"
              value={emailInput}
              onChange={handleEmailChange}
            />
            <label className="label" htmlFor="input">
              Email
            </label>
          </div>
          <button className="forgetpassword-btn" onClick={forgetPasswordhandler} disabled={isSubmitDisabled}>
            Reset Password
          </button>
          <span className="loginback-btn">
            or
          <Link to="/login">Log in</Link>
          </span>
        </form>
      </div>
      <div className="login-testimonie">
        <Link to="https://shorturl.at/ehGX2" target="_blank" className="rating">
          <img src={Glassdoor} alt="" />
        </Link>
        <div className="testimonie-card">
          <div className="inner-testimonie-card">
            <div className="testimonie-image">
              <img src={TestimonieImage2} alt="" />
            </div>
            <p>
              “A membership card serves as proof of belonging to an
              organization, granting access to exclusive perks, discounts,
              events, and fostering community engagement among like-minded
              individuals.”
            </p>
          </div>
          <div className="testimonie-profile">
            <Icon icon="ri:navigation-fill" />
            <p>Henry Paul, Force Sustainment . (IF)</p>
          </div>
        </div>
        <footer>
          Join 2,000,000+ Member who trust Colorado National Guard with their
          Membership Card
        </footer>
      </div>
    </div>
  );
};
