import { useRef } from "react";
import { useState } from "react";
import "./SignUp.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [invalidData, setInvalidData] = useState("");

  const emailRef = useRef();
  const navigate = useNavigate();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      await axios.post(BASE_URL + "auth/register", {
        email,
        password,
        username,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setInvalidData(err.response.data.keyValue);
      setEmail("");
      navigate("/register");
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
          <div className="signup-container">
            <div className="signup-input">
              <input
                className="input-field input-field1"
                type="email"
                placeholder="Email Address"
                ref={emailRef}
              />
              <button className="signup-button" onClick={handleStart}>
                Sign Up
              </button>
            </div>
            <div className="error-data">
              {invalidData &&
                (invalidData.email ? (
                  <span>Email Address already exists!</span>
                ) : (
                  <span>Username already exists!</span>
                ))}
            </div>
          </div>
        ) : (
          <form className="input">
            <input
              className="input-field input-field2"
              type="username"
              placeholder="User Name"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              className="input-field input-field3"
              type="password"
              placeholder="Password"
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
