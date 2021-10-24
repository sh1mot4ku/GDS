import React from "react";
import Button from "@mui/material/Button";
import { useLocation, Link } from "react-router-dom";
import menuItems from "../menuItems";
import "./Header.scss";

const HeaderPC = () => {
  const location = useLocation();
  return (
    <div>
      <nav className="nav-bar">
        <div className="menu">
          {menuItems.length !== 0 &&
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
            ))}
        </div>
        <Button variant="contained" className="round-button background-white">
          無料会員登録
        </Button>
        <Button variant="contained" color="primary" className="round-button">
          採用担当者の方
        </Button>
      </nav>
    </div>
  );
};

export default HeaderPC;
