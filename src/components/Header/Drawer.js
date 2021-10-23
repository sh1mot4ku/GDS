import React from "react";
import { Link } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

function Drawer({ isDrawerOpen, toggleDrawer }) {
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
          <List>
            {["ホーム", "求人一覧", "会社概要", "FAQs", "ブログ"].map(
              (menuItem) => (
                <ListItem button key={menuItem}>
                  <ListItemText primary={menuItem} />
                </ListItem>
              )
            )}
            <Button
              // onClick={}
              variant="contained"
              className="round-button background-white"
            >
              無料会員登録
            </Button>
            <Button
              // onClick={}
              variant="contained"
              color="primary"
              className="round-button"
            >
              採用担当者の方
            </Button>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

export default Drawer;
