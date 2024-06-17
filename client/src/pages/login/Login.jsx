import { useRef } from "react";
import * as React from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";

export default function Login() {
  const email = useRef();
  const password = useRef();
  // const { isFetching, dispatch } = useContext(AuthContext);
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.loading);
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };
  // console.log(user, isFetching, error);
  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialMedia</h3>
          <span className="loginDesc">Connecting people worldwide!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              minLength={6}
              required
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="background" size={"35px"} />
              ) : (
                "Log in"
              )}
            </button>
            <Link to={"/forgot-password"} className="loginForgot link">
              Forgot password?
            </Link>
            <button className="loginRegisterButton">
              <Link to={"/register"} className="link">
                {isFetching ? (
                  <CircularProgress color="background" size={"35px"} />
                ) : (
                  "Create a new account"
                )}
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
