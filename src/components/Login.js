import React, { useState } from "react";
import "../CSS/Login.css";
import logo from "../images/logo.svg";

import { auth } from "../firebase.js";

function Login({ setNotLogged }) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [signed, setSigned] = useState(true);

  function clearData() {
    setUserId("");
    setEmail("");
    setPswd("");
    if (!auth.currentUser.emailVerified) {
      auth.currentUser.sendEmailVerification();
      alert(
        `Verification link sent to email ${email} \nPlease verify to continue, also check your mail spam`
      );
      setNotLogged(true);
    } else {
      setNotLogged(false);
    }
  }

  function signUp(e) {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, pswd)
      .then((authUser) => {
        clearData();
        return authUser.user.updateProfile({ displayName: userId });
      })
      .catch((error) => {
        alert("Error: " + error.code + "\n" + error.message);
      });
  }

  function logIn(e) {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, pswd)
      .then(() => {
        clearData();
        setSigned(true);
      })
      .catch((error) => {
        alert("Error: " + error.code + "\n" + error.message);
      });
  }

  function forgotPassword() {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(`Password reset link is sent to ${email}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const style = {
    marginTop: "8px",
    color: "#8e8e8e",
    fontWeight: "bold",
  };

  return (
    <>
      <div id="login">
        <img src={logo} alt="Instagram logo" height={65} />
        <p style={style}>
          {!signed ? "Sign up" : "Log in"} to see and upload posts
        </p>
        <form onSubmit={signed ? logIn : signUp}>
          {!signed ? (
            <input
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              id="userName"
              type="text"
              placeholder="Username"
            />
          ) : (
            ""
          )}
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={pswd}
            onChange={(e) => {
              setPswd(e.target.value);
            }}
            type="password"
            placeholder="Password"
            minLength={8}
          />
          <button
            type="submit"
            disabled={!(email && pswd && (userId || signed))}
          >
            {!signed ? "Sign up" : "Log in"}
          </button>
        </form>

        {signed ? (
          <p
            style={{
              color: "#00376b",
              cursor: "pointer",
              fontSize: "0.8em",
              fontWeight: "bold",
            }}
            onClick={forgotPassword}
            title="make sure your have entered your email"
          >
            Forgot password?
          </p>
        ) : (
          ""
        )}

        <p style={{ paddingTop: "25px" }}>
          {signed ? "Don't have" : "Have"} an account?
          <button
            onClick={() => {
              setSigned(!signed);
            }}
          >
            {signed ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;
