import React, { useState, useRef, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Icon } from "@iconify/react";
import { UpdateProfile } from "pages/UpdateProfile/UpdateProfile";
import { Link } from "react-router-dom";
import UserAvatar from "Assets/image/User-avatar.svg.png";
import { useNavigate } from "react-router-dom";

import "./ContentManagement.scss";


import { NewRegistration } from "pages/NewRegistration/NewRegistration";
import { EditRegistration } from "pages/EditRegistration/EditRegistration";
import { Form1 } from "pages/Forms/Form1";
import { Form2 } from "pages/Forms/Form2";
import { Form3 } from "pages/Forms/Form3";


import { auth } from "config/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

/* END OF FIREBASE*/

export const ContentManagement = () => {
  const userProfileImageRef = useRef(null); // Create a ref for the image element
  const [userNavbarProfileImage, setUserNavbarProfileImage] = useState(null); // Create a ref for the image element
  const [userGreeting, setUserGreeting] = useState(null);
  const [newuserGreeting, setnewUserGreeting] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [userEmailAddress, setUserEmailAddress] = useState(null);
  const [userEmailVerification, setUserEmailVerification] = useState(null);

  const [isSidebarOpen, setSideBarOpen] = useState(false);

  const navigete = useNavigate();

  const toggleSidebar = () => {
    setSideBarOpen(!isSidebarOpen);
  };

  const authSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        navigete("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [navigete]);

  

  // no-restricted-globals

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userNameElement = document.getElementById("user-name");
        const userProfileImageElement = userProfileImageRef.current;

        if (userNameElement && userProfileImageElement) {
          showUserGreeting(userNameElement, user, (newGreeting) => {
            console.log("newGreeting:", newGreeting);
            setUserGreeting(newGreeting);
          });

          showProfilePicture(userProfileImageElement, user);
          showuUserprofileInfo();
        } else {
          console.error(
            "Element with ID 'user-name' or user profile image not found."
          );
        }
      } else {
        authSignOut();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [authSignOut, userProfileImageRef, userGreeting]);


  

  function showProfilePicture(imgElement, user) {
    const photoURL = user.photoURL;
    if (photoURL) {
      imgElement.src = photoURL;
    } else {
      imgElement.src = UserAvatar;
    }
  }

  //  USer Greeting

  function showUserGreeting(element, user) {
    const displayName = user.displayName;

    if (element) {
      if (displayName) {
        const userFirstName = displayName.split(" ")[0];
        element.textContent = `Hello, ${userFirstName}!`;
        setnewUserGreeting(element.textContent);
      } else {
        element.textContent = `Hello, friend!`;
      }
    }
  }


  function showuUserprofileInfo() {
    const user = auth.currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      setFullName(displayName);
      setnewUserGreeting(displayName);
      const email = user.email;
      setUserEmailAddress(email);
      const photoURL = user.photoURL;
      setUserNavbarProfileImage(photoURL);
      const emailVerified = user.emailVerified;
      console.log(emailVerified)
      // create a route component that show email verified
      setUserEmailVerification(emailVerified)
    }
  }



  /* EMAIL LINK VERIFICATION */


  return (
    <div>
      <div className="content-management">
        <div className="top__header">
          <header className="content-management__header">
            <ul className="nav__header">
              <li>
                <div className="user-profileImage" onClick={toggleSidebar}>
                  <img ref={userProfileImageRef} alt="user-profile_picture" />
                </div>
                <div id="user-name">{userGreeting}</div>
              </li>
            </ul>
          </header>
        </div>
        <article className="content-management__layout">
          <div
            className={`content-management__sidebar ${
              isSidebarOpen ? "open" : ""
            }`}
          >
            <div className="userprofile">
              <div className="inner-userprofile">
                <button onClick={toggleSidebar} className="back-Navigation">
                  <Icon icon="mingcute:left-line" />
                </button>

                <ul className="userprofile__Nav">
                  <div className="userprofile-header">
                    <div id="navbar-UserGreeting">{NewRegistration.name ? NewRegistration.name : newuserGreeting}</div>
                    <div className="profile_picture">
                      <Icon icon="material-symbols:edit" />
                      <img src={userNavbarProfileImage} alt="profile_picture" />
                    </div>
                  </div>
                  <li>
                    <span>Personal data</span>
                    <div className="userprofile-card">
                      <span className="userprofile-card-item">
                        <Icon icon="lucide:user-round" />
                        <span>
                          <h4>{fullName}</h4>
                          <h6>Full name</h6>
                        </span>
                      </span>
                      <span className="userprofile-card-item">
                        <Icon icon="ic:outline-email" />
                        <span>
                          <h4>{userEmailAddress}</h4>
                          <h6>Email {userEmailVerification ?<div className="email-auth-verified">Verified<Icon icon="ic:round-verified" /></div>:<div className="email-auth-not-verified">Not Verified<Icon icon="maki:caution" /></div>}</h6>
                        </span>
                      </span>
                    </div>
                  </li>
                  <li>
                    <span>Setting</span>
                    <div className="userprofile-card">
                      <span className="userprofile-card-item">
                        <span>
                          <h4>light | dark mode</h4>
                        </span>
                        <div className="mode">
                          <button>
                            <Icon icon="material-symbols:light-mode" />
                          </button>
                          <button>
                            <Icon icon="tdesign:mode-dark" />
                          </button>
                        </div>
                      </span>
                    </div>
                  </li>
                  <li>
                    <span>Security</span>
                    <button>
                      <div className="userprofile-card">
                        <div>
                          <span className="userprofile-card-item">
                            <Icon icon="mi:lock" />
                            <span>
                              <h4>Change password</h4>
                            </span>
                          </span>
                          <Icon icon="mingcute:right-line" />
                        </div>
                      </div>
                    </button>
                  </li>
                  <li>
                    <span>About</span>
                    <Link>
                      <div className="userprofile-card">
                        <div>
                          <span className="userprofile-card-item">
                            <Icon icon="bx:comment" />
                            <span>
                              <h4>Supports</h4>
                              <h6>Our contacts</h6>
                            </span>
                          </span>
                          <Icon icon="mingcute:right-line" />
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <div className="userprofile-card">
                        <div>
                          <span className="userprofile-card-item">
                            <Icon icon="mingcute:star-line" />
                            <span>
                              <h4>Rate the app</h4>
                              <h6>Tell us about your experince</h6>
                            </span>
                          </span>
                          <Icon icon="mingcute:right-line" />
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button onClick={authSignOut}>
                      <div className="userprofile-card">
                        <div>
                          <span className="userprofile-card-item">
                            <Icon icon="material-symbols:logout-sharp" />
                            <span>
                              <h4>Logout</h4>
                            </span>
                          </span>
                          <Icon icon="mingcute:right-line" />
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="content-management__content">
            <Suspense fallback={<div>Loading</div>}>
              <Routes>
                <Route path="forms/d1" exact element={<Form1 />} />
                <Route path="forms/d2" exact element={<Form2 />} />
                <Route path="forms/d3" exact element={<Form3 />} />
                <Route
                  path="update__profile"
                  exact
                  element={<UpdateProfile />}
                />
                <Route
                  path="edit/form/registration"
                  exact
                  element={<EditRegistration />}
                />
              </Routes>
            </Suspense>
            <footer className="contentManagement-footer">
              <span>
                This content is neither created nor endorsed by National Guard
                Colorado. Report Abuse - Terms of Service - Privacy Policy
              </span>
              <div>National Guard Colorado Memembership Registration Forms</div>
            </footer>
          </div>
        </article>
        <div className="edit-allform">
          <button>
            <Icon icon="material-symbols:edit-outline" />
          </button>
        </div>
      </div>
    </div>
  );
};
