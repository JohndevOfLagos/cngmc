import React, { useState } from "react";
import "./NewRegistration.scss";
import { useEffect } from "react";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* NAVIGATIONS */

// import { useEffect } from "react";


// import { auth } from "config/firebase-config";
import { auth, googleProvider } from "config/firebase-config";
import { createUserWithEmailAndPassword, signInWithRedirect, onAuthStateChanged} from "firebase/auth";

export const NewRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();



  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Form Validation //

  const isSubmitDisabled =
    !isEmailValid ||
    !isPasswordValid ||
    email.trim() === "" ||
    password.trim() === "";





  //  SIGNUP WITH EMAIL AND PASSWORD USER

  const signupForm = async (event) => {
    event.preventDefault();
      try{
        await createUserWithEmailAndPassword(auth, email, password);
      }catch(err){
         console.log(err.message)
      }
    

    clearAuthFields();
  };

    // SIGNUP GOOGLE PROVIDER  

  const signInGoogle = async (event) => {
    event.preventDefault();
      try{
        await signInWithRedirect(auth, googleProvider);
      }catch(err){
         console.log(err.message)
      }
    
  };

  const clearAuthFields = () => {
    setEmail("");
    setPassword("");
  };

  //

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/user/forms/d1");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  //





  return (
    <div className="signup-container">
      <div className="signup-body">
        <div className="signup wrap">
          <div className="h1">Signup</div>
          <form>
            <div className="signup-form-group">
            <input
              pattern=""
              placeholder="Full Name"
              id="name"
              name="name"
              type="name"
               maxLength={30}
              onChange={(event) => {
                setName(event.target.value);
              }}
              />

            </div>
            <div className="signup-form-group">
            <input
              pattern={emailRegex}
              placeholder="Email"
              id="email"
              name="email"
              type="email"
               maxLength={30}
              onChange={(event) => {
                setEmail(event.target.value);
                setIsEmailValid(emailRegex.test(event.target.value));
              }}
              />

            </div>
            {!isEmailValid && (
              <div className="input-error">Invalid email address.</div>
              )}
            
            <div className="signup-form-group">
              <input
              placeholder="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              pattern={passwordRegex}
              maxLength={30}
              onChange={(event) => {
                setPassword(event.target.value);
                setIsPasswordValid(passwordRegex.test(event.target.value));
                
              }}
            />
            
            <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <Icon icon="el:eye-open" />
                ) : (
                  <Icon icon="el:eye-close" />
                )}
              </span>
            </div>
            {!isPasswordValid && (
                <div className="input-error">
                  Password must be at least 8 characters with one lowercase, one
                  uppercase, and one digit.
                </div>
              )}
              
            <button
              className={`${
                isSubmitDisabled
                  ? "signup-btn button-disabled"
                  : "signup-btn button-enabled"
              }`}
              type="submit"
              onClick={signupForm}
            >
              Signup
            </button>
          </form>
            <button 
            onClick={signInGoogle}
            className="google-login-button">
            <Icon icon="flat-color-icons:google" />
              <span>Sign up with Google</span>
            </button>
            <div className="log-user-back">
              <span>Already have an account?<Link to="/login">Log in</Link></span>
            </div>
        </div>
      </div>
      {/* {errorMessage && <span className="signup-error">{errorMessage}</span>} */}
    </div>
  );
};
