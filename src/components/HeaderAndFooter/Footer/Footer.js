import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { footerMenuItemsLogOut, footerMenuItemsLogIn } from "../menuItems";
import useMedia from "use-media";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../../action/user";

export const Footer = () => {
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMobile = useMedia({ maxWidth: "768px" });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    if (uid) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [uid]);

  const createMenuList = (menuItems) =>
    menuItems.map((menuItem) => {
      if (menuItem.isExternal) {
        return (
          <a
            key={menuItem.title}
            href="https://note.com/lraough/m/m7b08a61f539c"
            rel="noopener noreferrer"
            className={menuItem.className}
            target="_blank"
          >
            {menuItem.title}
          </a>
        );
      } else {
        return (
          <Link
            key={menuItem.title}
            to={menuItem.to}
            className={menuItem.className}
            onClick={() => {
              menuItem.logOut && dispatch(startLogout());
            }}
          >
            {menuItem.title}
          </Link>
        );
      }
    });

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {isMobile && (
            <Link to={uid ? "/joblistings" : "/"}>
              <img
                className="company-logo-bk-mb"
                src="/image/lraoughLogoBk.png"
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
              <a
                href="https://www.facebook.com/takuya.shimomura"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/shimotaku/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon className="icon" />
              </a>
              <a
                href="https://twitter.com/lraough"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon className="icon" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCldoAQ3qyeC8wsho-4DcUIw"
                target="_blank"
                rel="noreferrer"
              >
                <YouTubeIcon className="icon" />
              </a>
            </div>
          </div>
          <div className="logo-copyright-wrapper">
            {!isMobile && (
              <Link
                to={uid ? "/joblistings" : "/"}
                className="company-logo-bk-wrapper"
              >
                <img
                  className="company-logo-bk"
                  src="/image/lraoughLogoBk.png"
                  alt="Lraough-logo"
                />
              </Link>
            )}
            <div className="copy-right">Lraough LLC All Right Reserved. </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
