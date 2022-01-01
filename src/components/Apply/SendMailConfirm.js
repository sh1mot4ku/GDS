import React from "react";
import { useLocation } from "react-router-dom";
import "./SendMailConfirm.scss";

const SendMailConfirm = () => {
  const {
    state: { email },
  } = useLocation();
  return (
    <div className="confirm-wrapper">
      <div className="confirm-container">
        <div className="confirm-header">
          メールアドレス受信確認用のメールを送信しました
        </div>
        <div>
          {email}
          へ受信確認用のメールを送信しました。
          <br />
          メールをご確認いただき、メールに記載された URL をクリックして、
          <br />
          Global Developersへの登録を完了してください。
        </div>
      </div>
    </div>
  );
};

export default SendMailConfirm;
