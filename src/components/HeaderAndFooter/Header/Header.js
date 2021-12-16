import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useMedia from "use-media";
import HeaderTBandMB from "./HeaderTBandMB";
import HeaderPC from "./HeaderPC";
import "./Header.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const { uid, userInfo } = useSelector((state) => state.user);
  const isTablet = useMedia({ maxWidth: "1024px" });
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsUserLoggedIn(true);
      userInfo.userType === "recruiter"
        ? setIsRecruiter(true)
        : setIsRecruiter(false);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <>
      {location.pathname === "/apply-developer" ||
      location.pathname === "/apply-recruiter" ||
      location.pathname === "/contact" ||
      location.pathname === "/login" ||
      location.pathname === "/forget-password" ||
      location.pathname === "/post_joblistings" ||
      location.pathname === "/joblistings_management" ||
      location.pathname.includes("/edit_joblisting/") ? null : (
        <header className="header">
          <div className="header-container">
            <Link to={uid ? "/joblistings" : "/"}>
              <img
                className="company-logo"
                src="image/lraoughLogo.png"
                alt="Lraough-logo"
              />
            </Link>
            {isUserLoggedIn !== null && isTablet ? (
              <HeaderTBandMB
                isUserLoggedIn={isUserLoggedIn}
                isRecruiter={isRecruiter}
              />
            ) : (
              <HeaderPC
                isUserLoggedIn={isUserLoggedIn}
                isRecruiter={isRecruiter}
              />
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
