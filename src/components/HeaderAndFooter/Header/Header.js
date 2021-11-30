import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useMedia from "use-media";
import HeaderTBandMB from "./HeaderTBandMB";
import HeaderPC from "./HeaderPC";
import "./Header.scss";
import { useSelector } from 'react-redux';

const Header = () => {
  const { uid } = useSelector(state => state.user)
  const isTablet = useMedia({ maxWidth: "1024px" });
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    if (uid) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [uid]);

  return (
    <>
      {location.pathname === '/apply-developer' ||
      location.pathname === '/apply-recruiter' ||
      location.pathname === '/contact' ||
      location.pathname === '/login' ? null : (
        <header className="header">
          <div className="header-container">
            <Link to="/">
              <img
                className="company-logo"
                src="image/lraoughLogo.png"
                alt="Lraough-logo"
              />
            </Link>
            {isUserLoggedIn !== null && isTablet ? (
              <HeaderTBandMB isUserLoggedIn={isUserLoggedIn} />
            ) : (
              <HeaderPC isUserLoggedIn={isUserLoggedIn} />
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
