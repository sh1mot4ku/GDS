import React from "react";
import Button from "@mui/material/Button";
import { useLocation, Link } from "react-router-dom";
import headerMenuItems from "./headerMenuItems";
import "./Header.scss";

const HeaderPC = () => {
  const location = useLocation();
  return (
    <div>
      <nav className="nav-bar">
        <div className="menu">
          {
            // [
            //   {
            //     title: "ホーム",
            //     className: [
            //       "menu-item",
            //       location.pathname === "/" && "activated-menu",
            //     ].join(" "),
            //     to: "/",
            //   },
            //   {
            //     title: "求人一覧",
            //     className: [
            //       "menu-item",
            //       location.pathname === "/joblistings" && "activated-menu",
            //     ].join(" "),
            //     to: "/joblistings",
            //   },
            //   {
            //     title: "会社概要",
            //     className: [
            //       "menu-item",
            //       location.pathname === "/about" && "activated-menu",
            //     ].join(" "),
            //     to: "/about",
            //   },
            //   {
            //     title: "FAQs",
            //     className: [
            //       "menu-item",
            //       location.pathname === "/faqs" && "activated-menu",
            //     ].join(" "),
            //     to: "/faqs",
            //   },
            //   {
            //     title: "ブログ",
            //     className: [
            //       "menu-item",
            //       location.pathname === "/blog" && "activated-menu",
            //     ].join(" "),
            //     to: "/blog",
            //   },
            // ]
            headerMenuItems.map((menuItem) => (
              <Link
                key={menuItem.title}
                className={
                  location.pathname === menuItem.to
                    ? [...menuItem.className, "activated-menu"].join(" ")
                    : menuItem.className
                }
                to={menuItem.to}
              >
                {menuItem.title}
              </Link>
            ))
          }
          {/* <Link
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
          </Link> */}
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
  );
};

export default HeaderPC;
