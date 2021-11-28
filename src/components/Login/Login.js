import React, { useState } from "react";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import { auth } from "../../firebase/firebase";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import { useHistory } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="main-login">
      <BlueSidePart />
      <div className="rightBox">
        <h2 className="title">Login</h2>
        <form className="form">
          <InputTextAndLabel
            label="EMAIL"
            placeholder="YOUR EMAIL"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputTextAndLabel
            label="PASSWORD"
            placeholder="YOUR PASSWORD"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="login-buttons">
            <Button
              onClick={onLogin}
              variant="contained"
              color="primary"
              className="round-button"
            >
              Login
            </Button>
            <button variant="contained" color="primary" className="sub-button">
              新規登録はこちら
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
