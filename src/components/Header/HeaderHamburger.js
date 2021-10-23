import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import "./Header.scss";

const HeaderHamburger = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      {/* <Link to="/">
        <img
          className="company-logo"
          src="photos/lraoughLogo.png"
          alt="Lraough-logo"
        />
      </Link> */}
      <div onClick={toggleDrawer}>
        <MenuIcon />
      </div>
      <Drawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
    </>
  );
};
export default HeaderHamburger;
