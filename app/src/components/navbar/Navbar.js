import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import account from "../../assets/account.png";
import { Search, Close } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(true);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
      <div className="navbar-container">
        <div className="container-left">
          <Link to="/">
            <img className="logo" src={logo} alt="Logo" />
          </Link>
          <ul className="nav-links">
            <input
              type="checkbox"
              id="checkbox-toggle"
              onClick={openMobileMenu}
            />
            <label for="checkbox-toggle" className="hamburger-icon">
              {" "}
              &#9776;{" "}
            </label>

            {mobileMenu && (
              <div className="nav-menu">
                <Link to="/" className="link">
                  <li>
                    <span>Home</span>
                  </li>
                </Link>
                <Link to="/movies" className="link">
                  <li>
                    <span>Movies</span>
                  </li>
                </Link>
                <Link to="/series" className="link">
                  <li>
                    <span>Series</span>
                  </li>
                </Link>
                <Link to="/my-list" className="link">
                  <li>
                    <span>MyList</span>
                  </li>
                </Link>
              </div>
            )}
          </ul>
        </div>
        <div className="container-right">
          <Search className="search-icon" onClick={openSearch} />
          {showSearch && (
            <div className="searchBar">
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search here..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />
                <Close className="close-button" onClick={openMobileMenu} />
              </div>
            </div>
          )}

          <div className="profile">
            <img
              src={account}
              className="profile-picture"
              alt="Profile Picture"
              onClick={() => {
                setDropDownMenu(!dropDownMenu);
              }}
            />
            {dropDownMenu && (
              <div className="options">
                <span className="drop-down-list">
                  <Link to={"/profile"} className="link">
                    Profile
                  </Link>
                </span>
                <span
                  className="drop-down-list"
                  onClick={() => dispatch(logout())}
                >
                  Log Out
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
