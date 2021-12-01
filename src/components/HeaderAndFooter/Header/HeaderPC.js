import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation, useHistory, Link } from "react-router-dom";
import { headerMenuItemsLogOut, headerMenuItemsLogIn } from "../menuItems";
import { auth } from "../../../firebase/firebase";
import "./Header.scss";

const HeaderPC = ({ isUserLoggedIn }) => {
  const location = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        handleClose();
        history.push("/");
      })
      .catch((e) => {
        console.error(e);
        handleClose();
      });
  };

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
            <>
              <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountCircleOutlinedIcon className="user-icon-no-img" />
                {/* change this after user img func is implemented            */}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className="dropdown-menu">
                  <Link to="/profile">
                    <MenuItem
                      className="dropdown-menuitem"
                      onClick={handleClose}
                    >
                      プロフィール
                    </MenuItem>
                  </Link>
                  <MenuItem className="dropdown-menuitem" onClick={onLogOut}>
                    ログアウト
                  </MenuItem>
                </div>
              </Menu>
            </>
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
