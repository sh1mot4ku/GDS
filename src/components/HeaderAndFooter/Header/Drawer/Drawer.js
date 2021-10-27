import React from "react";
import { useLocation, Link } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { headerMenuItemsLogOut, headerMenuItemsLogIn } from "../../menuItems";
import "./Drawer.scss";

function Drawer({ isDrawerOpen, toggleDrawer, isUserLoggedIn }) {
  const location = useLocation();

  const createMenuList = (menuItems) =>
    menuItems.map((menuItem) => (
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
    ));
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
          <div className="logo-closebtn-wrapper">
            <Link to="/">
              <img
                className="company-logo"
                src="photos/lraoughLogo.png"
                alt="Lraough-logo"
              />
            </Link>
            <div onClick={toggleDrawer}>
              <CloseIcon className="close-icon" />
            </div>
          </div>
          <nav className="nav-bar-drawer">
            <div className="menu-drawer">
              {isUserLoggedIn
                ? headerMenuItemsLogIn.length !== 0 &&
                  createMenuList(headerMenuItemsLogIn)
                : headerMenuItemsLogOut.length !== 0 &&
                  createMenuList(headerMenuItemsLogOut)}
            </div>
            <Link className="login" to="/login">
              ログイン
            </Link>
            <Button className="round-button-drawer background-white-drawer">
              無料会員登録
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="round-button-drawer"
            >
              採用担当者の方
            </Button>
          </nav>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

export default Drawer;