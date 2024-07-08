import React from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";

import loginWithGoogleImg from "../assets/login-with-google.png";
import gif from "../assets/login-animate.gif";
import "./login.css";
import logo from "../assets/Logo.png";

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login-main">
      <div>
        <img src={logo} alt="Blogging Logo" className="login-main-logo" />
      </div>

      <div className="login-dash"></div>

      <div>
        <p className="login-p">Login to Modify your Content</p>
      </div>

      <div>
        <img src={gif} alt="Logging in Animation" className="login-animation" />
      </div>

      <div className="login-button" onClick={signIn}>
        <img src={loginWithGoogleImg} />
      </div>
    </div>
  );
}

export default Login;
