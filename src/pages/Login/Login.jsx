import React, { useState } from "react";
import "./Login.scss";

import { Icon } from "@iconify/react/dist/iconify";
import { Link } from "react-router-dom/dist/index";



/* NAVIGATIONS */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { auth } from "config/firebase-config";
import { googleProvider } from "config/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
/* END OF FIREBASE*/

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();


  // 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //

  //  SIGNUP WITH EMAIL AND PASSWORD USER

  const loginForm = async (event) => {
   event.preventDefault();
     try{
       await signInWithEmailAndPassword(auth, email, password);
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
        setErrorMessage("Login successfully")
      } else {
        // Additional logic for when the user is not authenticated
        const error = new Error("User is not authenticated.");
        // console.log("User is not authenticated.");
        setErrorMessage(error.message)
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);


// 




// const inputType = showPassword ? 'text' : 'password';


const isSubmitDisabled = email.trim() === '' || password.trim() === '';


  
  

  return (
    <div className="login-container">
      <div className="inner-login">
      <div className="login wrap">
          <div className="h1">Login</div>
          <form>
            <div className="login-form-group">
            <input
              placeholder="Email"
              id="email"
              name="email"
              type="email"
               maxLength={30}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              />

            </div>
            
            <div className="login-form-group">
              <input
              placeholder="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              maxLength={30}
              onChange={(event) => {
                setPassword(event.target.value);                
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
            <button
              className={`${
                isSubmitDisabled
                  ? "login-btn button-disabled"
                  : "login-btn button-enabled"
              }`}
              type="submit"
              onClick={loginForm}
            >
              Login
            </button>
          </form>
            <button 
            onClick={signInGoogle}
            className="google-login-button">
            <Icon icon="flat-color-icons:google" />
              <span>Sign up with Google</span>
            </button>
            <div className="sigin-user-up">
              <span>Don't have an account?<Link to="/user/signup/Account">Sign up</Link></span>
            </div>
        </div>
      </div>
      {errorMessage &&  <span className="login-error">
               {errorMessage}
       </span> }
    </div>
  );
};
