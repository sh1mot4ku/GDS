import React, { useState } from "react";
// import { Button } from "@material-ui/core";
import "../ui/Button.scss"
import InputTextAndLabel from "../ui/InputTextAndLabel";
import { auth } from "../../firebase/firebase";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import { useHistory } from "react-router-dom";
import "./ForgetPassword.scss";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const history = useHistory();

  const onForgetPassword = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setFirebaseError("メールアドレスの形式が無効です");
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
    }
    setFirebaseError("");
  };

  return (
    <div className="main-ForgetPassword">
      <BlueSidePart />
      <div className="rightBox">
        <h2 className="title">パスワードを忘れた方</h2>
        <p className="subtitle">ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。</p>
        <form className="form">
          <InputTextAndLabel
            label="メールアドレス"
            placeholder="example@example.com"
            type="text"
            onChange={(e) => onHandleInputs(e.target.name, e.target.value)}
            value={email}
            name="email"
          />
          <p className={firebaseError !== "" ? "error-text" : "empty-box"}>
            {firebaseError}
          </p>
          <div className="ForgetPassword-buttons">
            <button
              onClick={onForgetPassword}
              className="btn-lg btn-fill"
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
