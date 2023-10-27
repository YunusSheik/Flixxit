import "./LogIn.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, ...data } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login-page">
      <div className="login-details">
        <div className="login-header">
          <img className="login-logo" src={logo} alt="logo" />
          <Link to="/register">
            <button className="login-signup-button">Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="login-description">
        <form className="login-form">
          <h1 className="login-h1">Log In</h1>
          {data?.error && <h3>User credentials is invalid.</h3>}
          <input
            className="login-input"
            id="input"
            type="email"
            placeholder="Email or Phone Number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            className="login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-login-button" onClick={handleLogin}>
            Log In
          </button>
          <Link to="/forgotPassword" className="forgot-password">
            <span>Forgot Passowrd ?</span>
          </Link>
          <span className="login-span">
            New to Flixxit? <b>Sign Up now.</b>
          </span>
        </form>
      </div>
    </div>
  );
}
