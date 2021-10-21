import React from "react";
import "./Footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="menu-sns-wrapper">
          <ul className="menu">
            <li className="menu-item">求人一覧</li>
            <li className="menu-item">会社概要</li>
            <li className="menu-item">FAQs</li>
            <li className="menu-item">ブログ</li>
          </ul>
          <div className="sns-wrapper">
            <FacebookIcon className="icon" />
            <LinkedInIcon className="icon" />
            <TwitterIcon className="icon" />
            <YouTubeIcon className="icon" />
          </div>
        </div>
        <div className="logo-copyright-wrapper">
          <img
            className="company-logo-bk"
            src="photos/lraoughLogoBk.png"
            alt=""
          />
          <div className="copy-right">Lraough LLC All Right Reserved. </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
