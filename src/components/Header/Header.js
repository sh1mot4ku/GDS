import React from "react";
import "./Header.scss";
import Button from "@mui/material/Button";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  console.log(location);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img className="company-logo" src="photos/lraoughLogo.png" alt="" />
        </Link>
        <nav className="nav-bar">
          <div className="menu">
            <Link
              className={[
                "menu-item",
                location.pathname === "/" && "activated-menu",
              ].join(" ")}
              to="/"
            >
              ホーム
            </Link>
            <Link
              className={[
                "menu-item",
                location.pathname === "/joblistings" && "activated-menu",
              ].join(" ")}
              to="/joblistings"
            >
              求人一覧
            </Link>
            <Link
              className={[
                "menu-item",
                location.pathname === "/about" && "activated-menu",
              ].join(" ")}
              to="/about"
            >
              会社概要
            </Link>
            <Link
              className={[
                "menu-item",
                location.pathname === "/faqs" && "activated-menu",
              ].join(" ")}
              to="/faqs"
            >
              FAQs
            </Link>
            <Link
              className={[
                "menu-item",
                location.pathname === "/blog" && "activated-menu",
              ].join(" ")}
              to="/blog"
            >
              ブログ
            </Link>
          </div>
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
      </div>
    </header>
  );
};

export default Header;
