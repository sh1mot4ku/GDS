import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../../../action/user';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import "../../../ui/Button.scss"
import {
  headerAndDrawerMenuItemsLogOut,
  drawerMenuItemsLogin,
} from '../../menuItems';
import { useSelector } from 'react-redux';
import './Drawer.scss';


function Drawer({ isDrawerOpen, toggleDrawer, isUserLoggedIn }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

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
              location.pathname === menuItem.to
                ? [...menuItem.className, 'activated-menu'].join(' ')
                : menuItem.className
            }
            to={menuItem.to}
            onClick={() => {
              menuItem.logOut && dispatch(startLogout());
            }}
          >
            {menuItem.title}
          </Link>
        );
      }
    });

  return (
    <div>
      <SwipeableDrawer
        anchor={'top'}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
          }}
        >
          <div className="logo-closebtn-wrapper">
            <Link to={uid ? '/joblistings' : '/'}>
              <img
                className="company-logo"
                src="image/lraoughLogo.png"
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
                ? drawerMenuItemsLogin.length !== 0 &&
                  createMenuList(drawerMenuItemsLogin)
                : headerAndDrawerMenuItemsLogOut.length !== 0 &&
                  createMenuList(headerAndDrawerMenuItemsLogOut)}
            </div>
            {isUserLoggedIn ? (
              <div className="post-button">
                <a
                  href="/joblistings_management"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-button-anchor"
                >
                  <span>求人投稿・管理</span>
                  <img src="/photos/chevron-right 2.svg" alt="chevron" />
                </a>
              </div>
            ) : (
              <div>
                <Link to="/apply-developer">
                  <button className="btn-lg btn-line-opacity">
                    無料会員登録
                  </button>
                </Link>
                <Link to="/apply-recruiter">
                  <button
                    variant="contained"
                    color="primary"
                    className="btn-lg btn-fill-opacity"
                  >
                    採用担当者の方
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

export default Drawer;
