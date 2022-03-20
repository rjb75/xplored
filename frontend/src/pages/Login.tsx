import Axios from "axios";
import React, { useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";
import axiosInstance from "../utils/axios";
import { setCookie } from "../utils/CookieUtils";
import "../styles/Login.scss";

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
    <div className="LoginDialog">
      <h1>{user === null ? "Not logged in" : "logged in as: " + user.email}</h1>
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
        }}
      >
        <label>UserName</label>
        <input type="text" id="email" placeholder="Enter Username" />

        <label>Password</label>
        <input type="password" id="password" placeholder="Enter Password" />

        <input type="button" value="Login" onClick={login} />
        <input type="button" value="Test API" onClick={testSuccess} />
      </div>
    </div>
  );
};

export default Login;
