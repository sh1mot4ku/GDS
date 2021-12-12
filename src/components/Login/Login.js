import React, { useState } from "react";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import { auth } from "../../firebase/firebase";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import { Link, useHistory } from "react-router-dom";
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
        history.push("/joblistings");
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
              "ログインの試行が何度も行われたため、セキュリティ上ユーザーアカウントを一時的にロックしています。しばらく経ってから再度お試しください。"
            );
            break;
          default:
            setFirebaseError(
              "予期しないエラーが発生しました。再度ログインして下さい。"
            );
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

  return (
    <div className="main-login">
      <BlueSidePart />
      <div className="rightBox">
        <h2 className="title">Login</h2>
        <form className="form">
          <InputTextAndLabel
            label="メールアドレス"
            placeholder="example@example.com"
            type="text"
            onChange={(e) => onHandleInputs(e.target.name, e.target.value)}
            value={email}
            name="email"
          />
          <InputTextAndLabel
            label="パスワード"
            placeholder="7文字以上の半角英数字"
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
            <Link to="/">
              <button
                variant="contained"
                color="primary"
                className="sub-button"
              >
                新規登録はこちら
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
