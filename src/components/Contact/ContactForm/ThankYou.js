import React from "react";
import "./ThankYou.scss";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <h1 className="title">Thank you for contacting</h1>
      <p className="text first-text">
        この度はGlobal Developersへのご連絡を頂き誠にありがとうございます。
      </p>
      <p className="text">
        ご連絡頂いた皆様には、1週間以内にご連絡を改めさせて頂きます。
      </p>
      <p className="text">今後とも何卒宜しくお願い致します。</p>
      <Link to="/">
        <Button variant="contained" className="back-btn">
          ホームへ戻る
        </Button>
      </Link>
    </div>
  );
};

export default ThankYou;
