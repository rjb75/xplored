import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";
import axiosInstance from "../utils/axios";
import { setCookie } from "../utils/CookieUtils";
import "../pages/UserAuth.scss";
import XploredLogo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authMessage, setAuthMessage] = useState<string>(" ");

  const locations = [
    "London",
    "Barcelona",
    "Madrid",
    "Italy",
    "Vienna",
    "Brusells",
    "Stockholm",
    "Helsinki",
    "Moscow",
    "Rome",
    "Milan",
    "Malta",
    "Oslo",
    "Amsterdam",
    "Vienna",
    "Rabat",
    "Mexicocity",
    "Banff",
    "Calgary",
    "Toronto",
    "Vancouver",
    "NYC",
    "LA",
    "Seattle",
    "CapeTown",
    "Singapore",
    "Tokyo",
    "Sydney",
    "Dubai",
    "Cairo",
    "Hongkong",
    "Malta",
    "Rio",
    "Santiago",
    "Lima",
    "Havana",
  ];

  const [bgImgURL, setBgImgURL] = useState<String>(
    "https://images.unsplash.com/photo-1635609164465-80955113c703?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );
  const photoAPIRequestBase = "/api/v1/photo/random?name=";

  const createUserAPIBase = "/api/v1/trip/user";

  const navigation = useNavigate();

  const GetImageURL = () => {
    const cityIndex = Math.floor(Math.random() * locations.length);
    const photoAPIRequest =
      photoAPIRequestBase + locations[cityIndex].toString();
    axiosInstance
      .get(photoAPIRequest)
      .then((res) => {
        console.log(res.data);
        setBgImgURL(res.data.url);
      })
      .catch((err) => console.log(err));
    return bgImgURL.toString;
  };

  useEffect(() => {
    GetImageURL();
  }, []);

  function doSignup() {
    if (!checkPasswordMatch()) {
      // Prevents signup if the password field inputs don't match
      return;
    }
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const pass = (document.getElementById("password") as HTMLInputElement)
      .value;
    createUserWithEmailAndPassword(firebaseAuth, email, pass).then(
      (userCredential) => {
        setUser(userCredential.user);
        setCookie("refresh_token", userCredential.user.refreshToken);
        userCredential.user.getIdToken(true).then((id) => {
          setCookie("id_token", id);
          setCookie("access_token", id);
          axiosInstance.post(createUserAPIBase)
          .then(() => navigation('/home'))
        });
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
      return false;
    } else {
      setAuthMessage(" ");
      return true;
    }
  }

  return (
    <>
      <img
        className="PageBackground"
        src={bgImgURL.toString()}
        alt="Background"
      />
      <div className="AuthPage">
        <div className="PageMessage">
          <h1 className=" TopLine">Making trip planning easy</h1>
          <h1 className=" BottomLine">
            Integrated with our transportation, accomodation, food, and activity
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
                onClick={() => doSignup()}
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
