import Axios from "axios";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";
import axiosInstance from "../utils/axios";
import { setCookie } from "../utils/CookieUtils";

const testEndpoint = "/api/v1/success";

const Signup = ()  => {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <div>
        <h1>Signup Page</h1>
    </div>
  );
}

export default Signup;
