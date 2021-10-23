import React from "react";
import { useLocation, Link } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import headerMenuItems from "./headerMenuItems";
import "./Header.scss";

function Drawer({ isDrawerOpen, toggleDrawer }) {
  const location = useLocation();
  return (
    <div>
      <SwipeableDrawer
        anchor={"top"}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <div>
            <Link to="/">
              <img
                className="company-logo"
                src="photos/lraoughLogo.png"
                alt="Lraough-logo"
              />
            </Link>
            <div onClick={toggleDrawer}>
              <CloseIcon />
            </div>
          </div>
          <nav className="nav-bar">
            <div className="menu">
              {headerMenuItems.map((menuItem) => (
                <Link
                  key={menuItem.title}
                  className={
                    location.pathname === menuItem.to
                      ? [...menuItem.className, "activated-menu"].join(" ")
                      : menuItem.className
                  }
                  to={menuItem.to}
                >
                  {menuItem.title}
                </Link>
              ))}
            </div>
          </nav>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

export default Drawer;
