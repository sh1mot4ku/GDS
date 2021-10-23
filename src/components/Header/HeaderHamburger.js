import React, { useState } from "react";
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
      <div onClick={toggleDrawer}>
        <MenuIcon />
        <Drawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      </div>
    </>
  );
};
export default HeaderHamburger;
