import Axios from "axios";
import { useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../firebase/FirebaseConfig";

const testEndpoint = "http://localhost:3000/api/login";

function Login() {
  const [user, setUser] = useState<User | null>(null);

  function login() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const pass = (document.getElementById("password") as HTMLInputElement).value;
    signInWithEmailAndPassword(firebaseAuth, email, pass).then(
      (userCredential) => {
        setUser(userCredential.user);
      }
    );
  }

  async function sendToken() {
    if (user != null) {
      await user.getIdToken().then((token) => {
        console.log(token);
        Axios.get(testEndpoint, {
          params: {
            token: token,
          },
        });
      });
    }
  }

  return (
    <div>
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
        <input type="button" value="Send Token" onClick={sendToken} />
      </div>
    </div>
  );
}

export default Login;
