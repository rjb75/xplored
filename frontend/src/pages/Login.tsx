import Axios from "axios";
import React, { useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";
import axiosInstance from "../utils/axios";
import { setCookie } from "../utils/CookieUtils";
import "../pages/Login.scss";

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
      <div className="LoginPage">
        <div className=" blur"></div>
        <div className="LoginDialog">
          <h1 className="LoginContent WelcomeMessage">Login</h1>
          <h1 className="LoginContent StatusMessage">
            {user === null ? "Not logged in" : "logged in as: " + user.email}
          </h1>
          <div className="LoginContent Spacer" />
          <div className="LoginContent Spacer" />

          <div className="LoginContent TextInput">
            <label className=" TextLabel">Username</label>
            <input
              className="TextText"
              type="text"
              id="email"
              placeholder="Username"
            />
          </div>

          <div className="LoginContent TextInput">
            <label className="TextLabel">Password</label>
            <input
              className="TextText"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="LoginContent Spacer" />
          <div className="LoginContent BottomActionButtons">
            <input
              className="LoginButton"
              type="button"
              value="Login"
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
    </>
  );
};

export default Login;
