import React from "react";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation, Link } from "react-router-dom";
import { headerMenuItemsLogOut, headerMenuItemsLogIn } from "../menuItems";
import "./Header.scss";

const HeaderPC = ({ isUserLoggedIn }) => {
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
      <nav className="nav-bar">
        <div className="menu">
          {isUserLoggedIn
            ? headerMenuItemsLogIn.length !== 0 &&
              createMenuList(headerMenuItemsLogIn)
            : headerMenuItemsLogOut.length !== 0 &&
              createMenuList(headerMenuItemsLogOut)}
        </div>
        <div className="nav-right">
          {isUserLoggedIn ? (
            <Link to="/user-profile">
              <AccountCircleOutlinedIcon className="logout-icon" />
            </Link> // change this after user img func is implemented
          ) : (
            <>
              <Link className="login" to="/login">
                ログイン
              </Link>
              <Link to="/apply-developer">
                <Button
                  variant="contained"
                  className="round-button background-white"
                >
                  無料会員登録
                </Button>
              </Link>
              <Link to="/apply-recruiter">
                <Button
                  variant="contained"
                  color="primary"
                  className="round-button"
                >
                  採用担当者の方
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default HeaderPC;
