import "./LogIn.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <div className="details">
        <div className="header">
          <img className="logo" src={logo} alt="logo" />
          <Link to="/register">
            <button className="signup-button">Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="description">
        <form>
          <h1>Log In</h1>
          <input
            type="email"
            placeholder="Email or Phone Number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Log In
          </button>
          <span>
            New to Flixxit? <b>Sign Up now.</b>
          </span>
        </form>
      </div>
    </div>
  );
}
