import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { auth } from "../../../firebase/firebase";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./PostAndManageSideBar.scss";

const PostAndManageSideBar = () => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const onLogOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        history.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <React.Fragment>
      {(location.pathname === "/post_joblistings" ||
        location.pathname === "/joblistings_management") &&
        user.userInfo && (
          <div className="sb-wrapper">
            <div className="sb-container">
              <div className="sb-top">
                <div className="sb-user-wrapper">
                  <AccountCircleOutlinedIcon className="sb-user-icon" />
                  <div className="sb-user-name">
                    {user.userInfo.profile.fullName}
                  </div>
                  <ArrowForwardIosIcon className="right-arrow" />
                </div>
                <div onClick={onLogOut} className="sb-logout">
                  ログアウト
                </div>
              </div>
              <div className="sb-list">
                <span className="sb-post-and-manage">求人投稿・管理</span>
              </div>
              <div className="sb-list">
                <a
                  href="/joblistings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="joblistings-anchor"
                >
                  <span>求人一覧</span>
                  <img src="/photos/chevron-right 2.svg" alt="chevron" />
                </a>
              </div>
              <Link to="/post_joblistings">
                <Button variant="contained" className="button-post-joblisting">
                  求人投稿
                </Button>
              </Link>
            </div>
          </div>
        )}
    </React.Fragment>
  );
};

export default PostAndManageSideBar;
