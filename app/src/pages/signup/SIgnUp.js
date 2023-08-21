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
  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);

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
        <h1>Watch unlimited Movies, Series and more.</h1>
        <h2>Binge exclusive content!</h2>
        <h3>
          Ready to join? Enter your email to create or restart membership.
        </h3>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email Address" ref={emailRef} />
            <button className="register-button" onClick={handleStart}>
              Sign Up
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="User Name" ref={usernameRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className="register-button" onClick={handleFinish}>
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
