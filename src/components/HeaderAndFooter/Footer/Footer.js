import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import menuItems from "../menuItems";
import useMedia from "use-media";

export const Footer = () => {
  const isMobile = useMedia({ maxWidth: "768px" });
  return (
    <footer className="footer">
      <div className="footer-container">
        {isMobile && (
          <Link to="/">
            <img
              className="company-logo-bk-mb"
              src="photos/lraoughLogoBk.png"
              alt="Lraough-logo"
            />
          </Link>
        )}
        <div className="menu-sns-wrapper">
          <div className="menu">
            {menuItems.length !== 0 &&
              menuItems.map((menuItem) => (
                <Link
                  key={menuItem.title}
                  to={menuItem.to}
                  className={menuItem.className}
                >
                  {menuItem.title}
                </Link>
              ))}
            <Link key="無料会員登録" to="/" className="menu-item">
              無料会員登録
            </Link>
            <Link key="採用担当者の方" to="/" className="menu-item">
              採用担当者の方
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
          {!isMobile && (
            <Link to="/" className="company-logo-bk-wrapper">
              <img
                className="company-logo-bk"
                src="photos/lraoughLogoBk.png"
                alt="Lraough-logo"
              />
            </Link>
          )}
          <div className="copy-right">Lraough LLC All Right Reserved. </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
