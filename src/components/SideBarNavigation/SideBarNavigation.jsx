import React, {useState, useEffect} from "react";
import "./SideBarNavigation.scss";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import AppLogo from "Assets/image/CONG_Official_Logo.png";


/*  FIREBASE  */

import { initializeApp } from "firebase/app";
import { getAuth, 
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsX2DYBMGmRAudDb6olsN-xt6H9YZjyYA",
  authDomain: "registerationcardguard.firebaseapp.com",
  projectId: "registerationcardguard",
  storageBucket: "registerationcardguard.appspot.com",
};

const app = initializeApp(firebaseConfig);


/* END OF FIREBASE*/

export const SideBarNavigation = ({ showMobileNav, toggleSideNav }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 


  const auth = getAuth(app);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div
      className={`${
        showMobileNav
          ? "homeNavs__mobile show-mobile"
          : "homeNavs__mobile hide-mobile"
      }`}
    >
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__header">
            <button
              type="button"
              className="icon-block"
              onClick={toggleSideNav}
            >
              <Icon icon="solar:minimize-square-bold" />
            </button>
            <img src={AppLogo} alt="" />
          </div>
          <ul className="sidebar__nav-list">
            <li>
              <Link to="/" className="sidebar-link">
                <Icon icon="clarity:home-solid" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link to="/registration/start" className="sidebar-link">
                <Icon icon="fluent:form-multiple-24-filled" />
                <span>New Registration</span>
              </Link>
            </li>   
            {isLoggedIn ?<li>
              <Link to="/login" className="sidebar-link">
              <Icon icon="lets-icons:form-fill" />
                <span>DD1172-2 FORM</span>
              </Link>
            </li> : <li>
              <Link to="/login" className="sidebar-link">
                <Icon icon="uis:padlock" />
                <span>Login</span>
              </Link>
            </li>}       
            <li>
              <Link to="/user/support/ticket" className="sidebar-link">
                <Icon icon="mdi:about" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/user/account" className="sidebar-link">
                <Icon icon="material-symbols:help" />
                <span>Help</span>
              </Link>
            </li>
            <li>
              <Link to="/user/account" className="sidebar-link">
                <Icon icon="material-symbols:help" />
                <span>Contact</span>
              </Link>
            </li>
            
            
          </ul>
        </div>
      </div>
    </div>
  );
};
