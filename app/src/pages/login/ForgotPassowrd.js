import React, { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { resetPassword } from "../../authContext/apiCalls";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      console.log("Password reset request sent.");
    } else {
      console.error("Passwords do not match.");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetPassword({ email, password }, dispatch);
  };

  return (
    <div className="login-page">
      <div className="details">
        <div className="header">
          <img className="logo" src={logo} alt="logo" />
          <Link to="/login">
            <button className="login-button">Log In</button>
          </Link>
        </div>
      </div>
      <div className="login-description">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-h1">Forgot Password</h1>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordsMatch && <p className="error">Passwords do not match.</p>}
          <button
            className="login-login-button"
            type="submit"
            onClick={handleReset}
          >
            <Link to="/login" className="forgot-password">
              Reset Password
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
