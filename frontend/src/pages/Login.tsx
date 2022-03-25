import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";
import axiosInstance from "../utils/axios";
import { setCookie } from "../utils/CookieUtils";
import "../pages/UserAuth.scss";
import XploredLogo from "../assets/Logo.svg";

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

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
    "https://images.unsplash.com/photo-1473042904451-00171c69419d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1499&q=80"
  );
  const photoAPIRequestBase = "/api/v1/photo/random?name=";

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

  // Used to get image only ONCE on loading the page.
  useEffect(() => {
    GetImageURL();
  }, []);

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
            Integrated with our transportation, accomodation, food and activity
            planner.
          </h1>
        </div>
        <div className="AuthDialog">
          <div className="AuthDialog DialogFront">
            <h1 className="AuthContent WelcomeMessage">Log In</h1>
            <h1 className="AuthContent StatusMessage">
              {user === null ? "Not logged in" : "logged in as: " + user.email}
            </h1>
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
                onClick={() => GetImageURL()}
              />
            </div>
          </div>
        </div>
        <a href="/login">
          <img
            className="LogoHeader"
            src={XploredLogo}
            alt="Xplored Logo"
          ></img>
        </a>
        <a href="/signup" className="ChangeAuthLink">
          Sign Up
        </a>
      </div>
    </>
  );
};

export default Login;
