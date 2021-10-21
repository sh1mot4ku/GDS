import React from "react";
import "./Header.scss";
import Button from "@material-ui/core/Button";

const Header = () => {
  return (
    <header className="header-container">
      <img className="company-logo" src="photos/lraoughLogo.png" alt="" />
      <nav className="nav-bar">
        <ul className="menu">
          <li className="menu-item">求人一覧</li>
          <li className="menu-item">会社概要</li>
          <li className="menu-item">FAQs</li>
          <li className="menu-item">ブログ</li>
        </ul>
        <Button
          // onClick={}
          variant="contained"
          className="round-button background-white"
        >
          無料会員登録
        </Button>
        <Button
          // onClick={}
          variant="contained"
          color="primary"
          className="round-button"
        >
          採用担当者の方
        </Button>
      </nav>
    </header>
  );
};

export default Header;
