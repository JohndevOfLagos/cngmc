import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import AppLogo from "Assets/image/CONG_Official_Logo.png";

export const Header = ({ toggleSideNav, isLoggedIn }) => {
  const handleLinkClick = (to) => {
    window.location.href = to;
  };



  return (
    <nav>
      <div className="innner-nav">
        <div>
          <button type="button" onClick={toggleSideNav}>
            <Icon icon="fe:bar" />
          </button>
          <img src={AppLogo} alt="" />
        </div>
        <ul className="nav-list">
          {isLoggedIn ? " ": <li>
              <Link
                className="nav-list_links"
                onClick={() => handleLinkClick("/registration/start")}
              >
                <span>New Registration</span>
              </Link>
            </li> }
            
          {isLoggedIn ? (
            <li>
              {/* Display user information or dashboard link when logged in */}
              <Link
                className="nav-list_links"
                onClick={() => handleLinkClick("/registration/form/d1")}
              >
                <span>
                <Icon icon="material-symbols-light:dashboard-outline-rounded" />Dashboard</span>
              </Link>
            </li>
          ) : (
            <li>
              {/* Display login link when not logged in */}
              <Link
                className="nav-list_links"
                onClick={() => handleLinkClick("/login")}
              >
                <span>
                  <Icon icon="uis:padlock" />
                  Login
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
