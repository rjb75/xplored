import Axios from "axios";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";
import axiosInstance from "../utils/axios";
import { setCookie } from "../utils/CookieUtils";
import "../pages/UserAuth.scss";
import XploredLogo from "../assets/Logo.svg";
import AuthBackgroundImage from "../assets/test_background_field.jpg";

const testEndpoint = "/api/v1/success";

const Signup = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authMessage, setAuthMessage] = useState<string>(" ");

  function Signup() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const pass = (document.getElementById("password") as HTMLInputElement)
      .value;
    createUserWithEmailAndPassword(firebaseAuth, email, pass).then(
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

  function checkPasswordMatch() {
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    if (password !== confirmPassword) {
      setAuthMessage("Passwords do not match");
    } else {
      setAuthMessage(" ");
    }
  }

  return (
    <>
      <img
        className="PageBackground"
        src={AuthBackgroundImage}
        alt="Background"
      />
      <div className="AuthPage">
        <div className="PageMessage">
          <h1 className=" TopLine">Making trip planning easy</h1>
          <h1 className=" BottomLine">
            Integrated with our transportation, accomodation, food and activity
            planner.
          </h1>
        </div>
        <div className="AuthDialog">
          <div className="AuthDialog DialogFront">
            <h1 className="AuthContent WelcomeMessage">Sign Up</h1>

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

            <div className="AuthContent TextInput">
              <label className="TextLabel">Confirm Password</label>
              <input
                className="TextText"
                type="password"
                id="confirmPassword"
                placeholder="Password"
                onChange={() => checkPasswordMatch()}
              />
            </div>
            <h1 className="AuthContent ErrorMessage">{authMessage}</h1>
            <div className="AuthContent BottomActionButtons">
              <input
                className="AuthButton"
                type="button"
                value="Sign Up"
                onClick={() => Signup}
              />
            </div>
          </div>
        </div>
        <img className="LogoHeader" src={XploredLogo} alt="Xplored Logo" />
        <a href="/login" className="ChangeAuthLink">
          Log In
        </a>
      </div>
    </>
  );
};

export default Signup;
