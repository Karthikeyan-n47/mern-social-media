import { useRef } from "react";
import "./register.css";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords do not match!");
    } else {
      try {
        await axios.post("auth/register", {
          email: email.current.value,
          password: password.current.value,
          username: username.current.value,
        });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">SocialMedia</h3>
          <span className="registerDesc">Connecting people worldwide!</span>
        </div>
        <div className="registerRight">
          <form onSubmit={handleSubmit} className="registerBox">
            <input
              placeholder="Email"
              required
              className="registerInput"
              ref={email}
              type="email"
            />
            <input
              placeholder="Username"
              required
              className="registerInput"
              ref={username}
            />
            <input
              placeholder="Password"
              required
              className="registerInput"
              ref={password}
              type="password"
              minLength={6}
            />
            <input
              placeholder="Confirm password"
              required
              className="registerInput"
              ref={confirmPassword}
              type="password"
              minLength={6}
            />
            <button className="registerButton" type="submit">
              Sign up
            </button>
            <button className="loginAccountButton">Log into account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
