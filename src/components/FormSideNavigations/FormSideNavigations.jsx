import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

import "./FormSideNavigations.scss";

export const FormSideNavigations = (props) => {
  const { showMobileFormSideNavigations, toggleSideNav } = props;

  return (
    <div
      className={`${
        showMobileFormSideNavigations
          ? "showMobileFormSideNavigations show-mobile"
          : "showMobileFormSideNavigations hide-mobile"
      }`}
    >
      <div className="FormSideNavigations">
        <div className="innner-FormSideNavigations">
          <div className="FormSideNavigations__header">
            <button onClick={toggleSideNav}>
            CloseMenu
              <Icon icon="solar:minimize-square-bold" />
            </button>
          </div>
          <ul className="nav-list__FormSideNavigations">
            <h2>Navigations</h2>
            <li>
              <NavLink to="user/dashboard" className="FormSideNavigations-NavLink">
                <span>
                  <Icon icon="material-symbols-light:dashboard-outline-rounded" />
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="jhiuyuijh" className="FormSideNavigations-NavLink">
                <span>
                  <Icon icon="iconamoon:profile-light" />
                  my profile
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="jhiui786876yuijh" className="FormSideNavigations-NavLink">
                <span>
                <Icon icon="material-symbols:edit-note-sharp" />
                  Edit Registration
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="jh87jh" className="FormSideNavigations-NavLink">
                <span>
                  <Icon icon="fluent:payment-24-regular" />
                  pay registration
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="j987hjh" className="FormSideNavigations-NavLink">
                <span>
                  <Icon icon="svg-spinners:3-dots-move" />
                  Check Status
                </span>
              </NavLink>
            </li>
          </ul>
          <ul className="FormSideNavigations-NavList__bottom">
            <li>
              <NavLink
                to="weterwtre"
                className="FormSideNavigations-NavLink__bottom"
              >
                <span>
                  <Icon icon="material-symbols:help-outline" />
                  Help center
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="iuyuioyiu"
                className="FormSideNavigations-NavLink__bottom"
              >
                <span>
                  <Icon icon="clarity:notification-outline-badged" />
                  notification
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
