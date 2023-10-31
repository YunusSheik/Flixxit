import React, { useContext } from "react";
import "./UserProfile.css";
import { Navbar } from "../../components/navbar/Navbar";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import Img from "../../components/lazyLoad/lazyLoadImg";

export const UserProfile = () => {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div className="porfile_page">
      <Navbar />
      <div className="user_profile">
        <h1>Edit Profile</h1>
        <div className="profile_info">
          <img src={avatar} className="profile_picture" alt="Profile Picture" />
          <div className="profile_details">
            <h2>{user.email}</h2>
            <div className="profile_plans">
              <h3>Subscription Plans</h3>
              <div className="user_plan">
                <div className="plan_info">
                  <h4>Flixxit Basic</h4>
                  <span>&#8377; 199</span>
                </div>
                <button
                  onClick={() =>
                    alert(
                      "Payments gateway not accessible now. Please wait for further updates..."
                    )
                  }
                  className="subscribe_button"
                >
                  Subscribe
                </button>
              </div>
              <div className="user_plan">
                <div className="plan_info">
                  <h4>Flixxit Standard</h4>
                  <span>&#8377; 499</span>
                </div>
                <button
                  onClick={() =>
                    alert(
                      "Payments gateway not accessible now. Please wait for further updates..."
                    )
                  }
                  className="subscribe_button"
                >
                  Subscribe
                </button>
              </div>
              <div className="user_plan">
                <div className="plan_info">
                  <h4>Flixxit Premium</h4>
                  <span>&#8377; 649</span>
                </div>
                <button
                  onClick={() =>
                    alert(
                      "Payments gateway not accessible now. Please wait for further updates..."
                    )
                  }
                  className="subscribe_button"
                >
                  Subscribe
                </button>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="logout_button"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
