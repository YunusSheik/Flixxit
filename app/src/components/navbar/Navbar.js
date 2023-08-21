import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import account from "../../assets/account.png";
import { Notifications, Search, KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
      <div className="navbar-container">
        <div className="container-left">
          <img className="logo" src={logo} alt="Logo" />
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link className="link">
            <span>MyList</span>
          </Link>
        </div>
        <div className="container-right">
          <Search className="icons" />
          <Notifications className="icons" />
          <img
            src={account}
            className="profile-picture"
            alt="Profile Picture"
          />
          <div className="profile">
            <KeyboardArrowDown className="icons" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
