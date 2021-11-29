import React from "react";
// import "./ThankYou.scss";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const ThankYouForApplying = () => {
  return (
    <div className="thankyou-container">
      <h1 className="title">Thank you for applying</h1>
      <p className="text first-text">
        ご応募ありがとうございました！担当から直ぐに連絡致します。
      </p>
      <Link to="/">
        <Button variant="contained" className="back-btn">
          ホームへ戻る
        </Button>
      </Link>
    </div>
  );
};

export default ThankYouForApplying;
