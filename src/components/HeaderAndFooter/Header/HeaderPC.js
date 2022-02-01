import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation, Link } from "react-router-dom";
import { headerMenuItemsLogOut, headerMenuItemsLogIn } from "../menuItems";
import { auth } from "../../../firebase/firebase";
import UrgeApplyModal from "../../ui/UrgeApplyModal";
import "./Header.scss";

const HeaderPC = ({ isUserLoggedIn, isRecruiter }) => {
  const { userInfo, emailVerified } = useSelector((state) => state.user);
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
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
        handleClose();
      })
      .catch((e) => {
        console.error(e);
        handleClose();
      });
  };

  const createMenuList = (menuItems) =>
    menuItems.map((menuItem) => {
      if (menuItem.isExternal) {
        return (
          <a
            key={menuItem.title}
            href="https://note.com/lraough/m/m7b08a61f539c"
            rel="noopener noreferrer"
            className={menuItem.className}
            target="_blank"
          >
            {menuItem.title}
          </a>
        );
      } else {
        return (
          <Link
            key={menuItem.title}
            className={
              location.pathname === menuItem.to ||
              (location.pathname.includes("joblisting/") &&
                menuItem.to === "/joblistings")
                ? [...menuItem.className, "activated-menu"].join(" ")
                : menuItem.className
            }
            to={menuItem.to}
          >
            {menuItem.title}
          </Link>
        );
      }
    });

  const manageEl = (
    <>
      <span>求人投稿・管理</span>
      <img src="/photos/chevron-right 2.svg" alt="chevron" />
    </>
  );

  return (
    <>
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
                <div className="user-icon-post-button">
                  <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    {userInfo?.profile?.photoUrl ? (
                      <img
                        alt="user-icon"
                        src={userInfo?.profile?.photoUrl}
                        className="user-icon"
                      />
                    ) : (
                      <AccountCircleOutlinedIcon className="user-icon-no-img" />
                    )}
                  </Button>
                  {isRecruiter && (
                    <div className="post-button">
                      {emailVerified ? (
                        <a
                          href="/joblistings_management"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="post-button-anchor"
                        >
                          {manageEl}
                        </a>
                      ) : (
                        <div
                          onClick={() => setIsOpenModal(true)}
                          className="post-button-anchor"
                        >
                          {manageEl}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                    <Link to="/" onClick={onLogOut}>
                      <MenuItem className="dropdown-menuitem">
                        ログアウト
                      </MenuItem>
                    </Link>
                  </div>
                </Menu>
              </>
            ) : (
              <>
                <Link className="login" to="/login">
                  ログイン
                </Link>
                <Link to="/apply-developer">
                  <button className="btn-sm btn-line-opacity btn-margin">
                    無料会員登録
                  </button>
                </Link>
                <Link to="/apply-recruiter">
                  <button className="btn-sm btn-fill-opacity">
                    採用担当者の方
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {isOpenModal && (
        <UrgeApplyModal
          onClose={() => setIsOpenModal(false)}
          isUserLoggedIn={isUserLoggedIn}
          isEmailVerified={emailVerified}
        />
      )}
    </>
  );
};

export default HeaderPC;
