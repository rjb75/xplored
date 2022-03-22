import Axios from "axios";
import React, { useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";
import axiosInstance from "../utils/axios";
import { setCookie } from "../utils/CookieUtils";
import "../pages/Login.scss";
import XploredLogo from "../assets/Logo.svg";

const testEndpoint = "/api/v1/success";

const Login = () => {
  const [user, setUser] = useState<User | null>(null);

  function login() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const pass = (document.getElementById("password") as HTMLInputElement)
      .value;
    signInWithEmailAndPassword(firebaseAuth, email, pass).then(
      (userCredential) => {
        setUser(userCredential.user);
        userCredential.user.getIdToken(true).then((id) => {
          setCookie("id_token", id);
          setCookie("access_token", id);
        });
        setCookie("refresh_token", userCredential.user.refreshToken);
      }
    );
  }

  const testSuccess = () => {
    axiosInstance
      .get(testEndpoint)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="AuthPage">
        <div className="PageMessage">
          <h1 className=" TopLine">This is the top line</h1>
          <h1 className=" BottomLine">Bottom line, babyyyyyy</h1>
        </div>
        <div className="AuthDialog">
          <div className="AuthDialog DialogBlur" />
          <div className="AuthDialog DialogFront">
            <h1 className="AuthContent WelcomeMessage">Log In</h1>
            <h1 className="AuthContent StatusMessage">
              {user === null ? "Not logged in" : "logged in as: " + user.email}
            </h1>
            <div className="AuthContent Spacer" />
            <div className="AuthContent Spacer" />

            <div className="AuthContent TextInput">
              <label className=" TextLabel">Username</label>
              <input
                className="TextText"
                type="text"
                id="email"
                placeholder="Username"
              />
            </div>

            <div className="AuthContent TextInput">
              <label className="TextLabel">Password</label>
              <input
                className="TextText"
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="AuthContent Spacer" />
            <div className="AuthContent BottomActionButtons">
              <input
                className="AuthButton"
                type="button"
                value="Log In"
                onClick={login}
              />

              {/* <input
              className="LoginButton"
              type="button"
              value="Test API"
              onClick={testSuccess}
            /> */}
            </div>
          </div>
        </div>
        <img className="LogoHeader" src={XploredLogo} alt="Xplored Logo" />
      </div>
    </>
  );
};

export default Login;
