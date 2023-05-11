import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const wrapperClassName = user ? "profile-createSpot-wrapper" : "";

  return (
    <>
    <div className={wrapperClassName}>
      {user && (
        <Link to="/spots/new" id="create-spot-link">
          Create a New Spot
        </Link>
      )}
      <button onClick={openMenu} className="profile-button">
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle fa-2xl" />
      </button>
    </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div id="dropdown-wrapper">
            <div id="user-info">
              <li>Hello, {user.firstName}</li>
              <li>{user.email}</li>
            </div>
            <div id="manage-spots">
              <Link to="/spots/current">Manage Spots</Link>
            </div>
            <li id="logout-button-wrapper">
              <button id="logout-button" onClick={logout}>
                Log Out
              </button>
            </li>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
