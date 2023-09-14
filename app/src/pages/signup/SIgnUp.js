import { useRef } from "react";
import { useState } from "react";
import "./SignUp.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();
  // const passwordRef = useRef();
  // const usernameRef = useRef();
  const navigate = useNavigate();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    // setPassword(passwordRef.current.value);
    // setUsername(usernameRef.current.value);

    try {
      await axios.post("auth/register", { email, password, username });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">
      <div className="details">
        <div className="header">
          <img className="logo" src={logo} alt="logo" />
          <Link to="/login">
            <button className="login-button">Log In</button>
          </Link>
        </div>
      </div>
      <div className="description">
        <h1 className="signup-header1">
          Watch unlimited Movies, Series and more.
        </h1>
        <h2 className="signup-header2">Binge exclusive content!</h2>
        <h3 className="signup-header3">
          Ready to join? Enter your email to create or restart membership.
        </h3>
        {!email ? (
          <div className="signup-input">
            <input
              className="input-field"
              type="email"
              placeholder="Email Address"
              ref={emailRef}
            />
            <button className="register-button" onClick={handleStart}>
              Sign Up
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              className="input-field"
              type="username"
              placeholder="User Name"
              // ref={usernameRef}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              // ref={passwordRef}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="register-button" onClick={handleFinish}>
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
