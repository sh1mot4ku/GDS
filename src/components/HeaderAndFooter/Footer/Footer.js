import React, { useState, useEffect } from 'react';
import './Footer.scss';
import { Link, useLocation } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { footerMenuItemsLogOut, footerMenuItemsLogIn } from '../menuItems';
import useMedia from 'use-media';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../../action/user';

export const Footer = () => {
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isMobile = useMedia({ maxWidth: '768px' });
  const location = useLocation();
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
      {location.pathname === '/apply-developer' ||
      location.pathname === '/apply-recruiter' ||
      location.pathname === '/contact' ||
      location.pathname === '/login' ? null : (
        <footer className="footer">
          <div className="footer-container">
            {isMobile && (
              <Link to={uid ? '/joblistings' : '/'}>
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
                <Link
                  to={uid ? '/joblistings' : '/'}
                  className="company-logo-bk-wrapper"
                >
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
