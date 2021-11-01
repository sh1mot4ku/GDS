import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { Link, useLocation } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { footerMenuItemsLogOut, footerMenuItemsLogIn } from "../menuItems";
import { useAuthContext } from "../../../context/auth-context";
import useMedia from "use-media";

export const Footer = () => {
  const isMobile = useMedia({ maxWidth: "768px" });
  const location = useLocation();
  const { loginId } = useAuthContext();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    if (loginId === null) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }, [loginId]);

  const createMenuList = (menuItems) =>
    menuItems.map((menuItem) => (
      <Link
        key={menuItem.title}
        to={menuItem.to}
        className={menuItem.className}
      >
        {menuItem.title}
      </Link>
    ));

  return (
    <>
      {location.pathname === "/apply-developer" ||
      location.pathname === "/apply-recruiter" ||
      location.pathname === "/contact" ? null : (
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
                {isUserLoggedIn !== null && isUserLoggedIn
                  ? footerMenuItemsLogIn.length !== 0 &&
                    createMenuList(footerMenuItemsLogIn)
                  : footerMenuItemsLogOut.length !== 0 &&
                    createMenuList(footerMenuItemsLogOut)}
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
      )}
    </>
  );
};

export default Footer;
