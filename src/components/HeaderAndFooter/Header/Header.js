import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useMedia from "use-media";
import HeaderTBandMB from "./HeaderTBandMB";
import HeaderPC from "./HeaderPC";
import { useAuthContext } from "../../../context/auth-context";
import "./Header.scss";

const Header = () => {
  const isTablet = useMedia({ maxWidth: "1024px" });
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

  return (
    <>
      { location.pathname === "/apply-developer" ||
        location.pathname === "/apply-recruiter" ||
        location.pathname === "/login" ? null : (
        <header className="header">
          <div className="header-container">
            <Link to="/">
              <img
                className="company-logo"
                src="photos/lraoughLogo.png"
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
