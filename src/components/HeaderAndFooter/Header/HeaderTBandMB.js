import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer/Drawer";
import "./Header.scss";

const HeaderTBandMB = ({ isUserLoggedIn }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <div onClick={toggleDrawer}>
        <MenuIcon className="hamburger-icon" />
        <Drawer
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          isUserLoggedIn={isUserLoggedIn}
        />
      </div>
    </>
  );
};
export default HeaderTBandMB;
