import React, { useState } from "react";
import "../ui/Button.scss";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import { auth } from "../../firebase/firebase";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import { useHistory } from "react-router-dom";
import validator from "validator";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const onResetPassword = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setError("メールアドレスが無効です");
      return;
    }
    auth
      .sendPasswordResetEmail(email, { url: window.location.origin })
      .then(() => {
        history.push({
          pathname: "/reset-password-confirm",
          state: { email },
        });
      })
      .catch((error) => {
        if (email === "")
          switch (error.code) {
            case "auth/invalid-email":
              setError("メールアドレスの形式が無効です");
              break;
            case "auth/missing-continue-uri":
              setError("作業継続用のURLが発行されませんでした。");
              break;
            case "auth/invalid-continue-uri":
              setError("作業継続用のURLが正しくありません。");
              break;
            case "auth/user-not-found":
              setError("Eメールに対応するアカウントが見つかりませんでした。");
              break;
            default:
              setError(
                "予期しないエラーが発生しました。再度ログインして下さい。"
              );
          }
        console.error(error);
      });
  };
  const onHandleInputs = (inputValue) => {
    validator.isLength(inputValue, 0, 254) && setEmail(inputValue);
    setError("");
  };

  return (
    <div className="main-ResetPassword">
      <BlueSidePart />
      <div className="rightBox">
        <div className="rightBox-container">
          <h2 className="title">パスワードを忘れた方</h2>
          <p className="subtitle">
            ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。
          </p>
          <form className="form">
            <InputTextAndLabel
              label="メールアドレス"
              placeholder="example@example.com"
              type="text"
              onChange={(e) => onHandleInputs(e.target.value)}
              value={email}
              name="email"
            />
            <p className={error !== "" ? "error-text" : "empty-box"}>{error}</p>
            <div className="ResetPassword-buttons">
              <button onClick={onResetPassword} className="btn-lg btn-fill">
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
