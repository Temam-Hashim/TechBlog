import React from "react";
import "./Login.css";
import axios from "axios";
import { useState, useRef, useContext } from "react";
import { Context } from "../../context/Context";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      setError("all fields are required!");
    } else if (password !== resetPassword) {
      setError("password doesn't match");
    } else {
      try {
        const res = await axios.post("/auth/register/", {
          username,
          email,
          password,
        });
        if (res) {
          alert("Registration successfully!");
          window.location.replace("/login");
        }
      } catch (err) {
        setError("username already exists");
      }
    }
  };

  // login
  const emailRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      if (res.data === "invalid credential") {
        setError("wrong email or password!");
        dispatch({ type: "LOGIN_FAILURE" });
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        alert("LOGIN SUCCESS");
        window.location.replace("/");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <React.Fragment>
      {/* import header */}
      {/* <Header/> */}

      <div className="login row">
        <nav className="tabContainer">
          <div className="nav nav-tabs tabList" id="nav-tab" role="tablist">
            <button
              className="nav-link active tabListItem"
              id="nav-login-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-login"
              type="button"
              role="tab"
              aria-controls="nav-login"
              aria-selected="true"
            >
              Login
            </button>
            <button
              className="nav-link tabListItem"
              id="nav-register-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-register"
              type="button"
              role="tab"
              aria-controls="nav-register"
              aria-selected="false"
            >
              Register
            </button>
          </div>
        </nav>
        <div className="tab-content row" id="nav-tabContent">
          {/* login page */}
          <div className="col-md-4"></div>
          <div
            className="tab-pane fade show active loginPage col-md-4"
            id="nav-login"
            role="tabpanel"
            aria-labelledby="nav-login-tab"
          >
            <h1 className="loginTitle">LOGIN PAGE</h1>
            <form
              className="loginForm"
              autoComplete="off"
              onSubmit={handleLogin}
            >
              <div className="form-group input-group flex-nowrap inputSets">
                <span className="input-group-text" id="password">
                  <i className="fa fa-envelope inputIcon" />
                </span>
                <input
                  type="email"
                  className="form-control inputs"
                  aria-label="email"
                  placeholder="Email Address"
                  aria-describedby="email"
                  ref={emailRef}
                />
              </div>

              <div className="form-group input-group flex-nowrap inputSets">
                <span className="input-group-text" id="password">
                  <i className="fa fa-lock inputIcon" />
                </span>
                <input
                  type="password"
                  className="form-control inputs"
                  placeholder="Enter Password"
                  aria-label="password"
                  aria-describedby="password"
                  ref={passRef}
                />
              </div>
              <span className="error">{error}</span>
              <button
                className="btn btn-info btn-lg loginBtn"
                type="submit"
                disabled={isFetching}
              >
                LOGIN
              </button>
              <span className="forgot">Forgot password?</span>
            </form>
          </div>

          <div
            className="tab-pane fade loginPage col-md-4"
            id="nav-register"
            role="tabpanel"
            aria-labelledby="nav-register-tab"
          >
            <h1 className="loginTitle">REGISTRATION PAGE</h1>
            <form
              className="loginForm"
              autoComplete="off"
              onSubmit={handleRegister}
            >
              <div className="form-group m-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control loginInputs"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  className="form-control loginInputs"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="password1">Password</label>
                <input
                  type="password"
                  className="form-control loginInputs"
                  id="password1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control loginInputs"
                  id="password2"
                  onChange={(e) => {
                    setResetPassword(e.target.value);
                  }}
                />
              </div>
              <span className="error">{error}</span>
              <button className="registerBtn" type="submit">
                REGISTER
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      {/* import sidebar */}
      {/* import { axios } from 'axios';
<Sidebar/>import { axios } from 'axios';
 */}
    </React.Fragment>
  );
}

export default Login;
