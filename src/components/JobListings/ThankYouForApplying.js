import React from "react";
// import "./ThankYou.scss";
import { Link } from "react-router-dom";
import "../ui/Button.scss"

const ThankYouForApplying = () => {
  return (
    <div className="thankyou-container">
      <h1 className="title">Thank you for Applying</h1>
      <p className="text ">ご応募ありがとうございました！</p>
      <p className="text second-text">担当から直ぐに連絡致します。</p>
      <Link to="/">
        <button  className="btn-lg btn-fill">
          ホームへ戻る
        </button>
      </Link>
    </div>
  );
};

export default ThankYouForApplying;
