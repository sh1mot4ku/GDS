import React, { useState } from "react";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "../Apply/InputTextAndLabel";
import { auth } from "../../firebase/firebase";
import { insertUser } from "../../API/dbutils";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import { useHistory } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setFirebaseError("メールアドレスの形式が無効です");
            break;
          case "auth/user-disabled":
            setFirebaseError("登録情報が無効です");
            break;
          case "auth/user-not-found":
            setFirebaseError("登録情報が存在しません");
            break;
          case "auth/wrong-password":
            setFirebaseError("パスワードが正しくありません");
            break;
          case "auth/too-many-requests":
            setFirebaseError(
              "ログインの試行が何度も行われたため、セキュリティ上ユーザーアカウントを一時的にロックしています。しばらく経ってから再度お試し下さい。"
            );
            break;
        }
        console.error(error);
      });
  };
  const onHandleInputs = (input, inputValue) => {
    if (input === "email") {
      setEmail(inputValue);
    } else if (input === "password") {
      setPassword(inputValue);
    }
    setFirebaseError("");
  };
  console.log(email, password);

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
            onChange={(e) => onHandleInputs(e.target.name, e.target.value)}
            value={email}
            name="email"
          />
          <InputTextAndLabel
            label="PASSWORD"
            placeholder="YOUR PASSWORD"
            type="password"
            onChange={(e) => onHandleInputs(e.target.name, e.target.value)}
            value={password}
            name="password"
          />
          <p className={firebaseError !== "" ? "error-text" : "empty-box"}>
            {firebaseError}
          </p>
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
