import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { Link, useLocation } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { footerMenuItemsLogOut, footerMenuItemsLogIn } from "../menuItems";
import useMedia from "use-media";
import { useSelector } from 'react-redux';
import { auth } from '../../../firebase/firebase';

export const Footer = () => {
  const { uid } = useSelector(state => state.user)
  const isMobile = useMedia({ maxWidth: "768px" });
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    if (uid) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [uid]);

  const onLogOut = () => {
    auth.signOut().then(() => {
      console.log('User logged out');
    }).catch((e) => {
      console.error(e);
    })
  };

  const createMenuList = (menuItems) =>
    menuItems.map((menuItem) => (
      <Link
        key={menuItem.title}
        to={menuItem.to}
        className={menuItem.className}
        onClick={menuItem.logOut && onLogOut}
      >
        {menuItem.title}
      </Link>
    ));

  return (
    <>
      { location.pathname === "/apply-developer" ||
        location.pathname === "/apply-recruiter" ||
        location.pathname === "/login" ? null : (
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
