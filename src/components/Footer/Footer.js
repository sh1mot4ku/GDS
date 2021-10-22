import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="menu-sns-wrapper">
          <div className="menu">
            <Link to="/" className="menu-item">
              ホーム
            </Link>
            <Link to="/joblistings" className="menu-item">
              求人一覧
            </Link>
            <Link to="/about" className="menu-item">
              会社概要
            </Link>
            <Link to="/faqs" className="menu-item">
              FAQs
            </Link>
            <Link to="/blog" className="menu-item">
              ブログ
            </Link>
            <Link to="/" className="menu-item">
              無料会員登録
            </Link>
            <Link to="/" className="menu-item">
              採用担当の方
            </Link>
          </div>
          <div className="sns-wrapper">
            <FacebookIcon className="icon" />
            <LinkedInIcon className="icon" />
            <TwitterIcon className="icon" />
            <YouTubeIcon className="icon" />
          </div>
        </div>
        <div className="logo-copyright-wrapper">
          <Link to="/" className="company-logo-bk-wrapper">
            <img
              className="company-logo-bk"
              src="photos/lraoughLogoBk.png"
              alt=""
            />
          </Link>
          <div className="copy-right">Lraough LLC All Right Reserved. </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
