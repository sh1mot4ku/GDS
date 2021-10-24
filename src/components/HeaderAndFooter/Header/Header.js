import React from "react";
import { Link } from "react-router-dom";
import useMedia from "use-media";
import HeaderHamburger from "./HeaderHamburger";
import HeaderPC from "./HeaderPC";
import "./Header.scss";

const Header = () => {
  const isTablet = useMedia({ maxWidth: "1024px" });

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img
            className="company-logo"
            src="photos/lraoughLogo.png"
            alt="Lraough-logo"
          />
        </Link>
        {isTablet ? <HeaderHamburger /> : <HeaderPC />}
      </div>
    </header>
  );
};

export default Header;
