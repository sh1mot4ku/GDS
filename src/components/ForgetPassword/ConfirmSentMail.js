import React from "react";
import { useLocation } from "react-router-dom";
import "./ConfirmSentMail.scss";

const ConfirmSentMail = () => {
  const {
    state: { email },
  } = useLocation();

  return (
    <div className="confirm-wrapper">
      <div className="confirm-container">
        <div className="confirm-header">
          パスワード再設定用のメールを送信しました
        </div>
        <div>
          {email}
          へパスワード再設定用のメールを送信しました。
          <br />
          メールをご確認いただき、メールに記載された URL
          をクリックしてください。
        </div>
      </div>
    </div>
  );
};

export default ConfirmSentMail;
