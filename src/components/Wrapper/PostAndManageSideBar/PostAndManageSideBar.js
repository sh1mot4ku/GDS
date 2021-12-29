import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { auth } from "../../../firebase/firebase";
import { Link } from "react-router-dom";
import "../../ui/Button.scss";
import "./PostAndManageSideBar.scss";

const PostAndManageSideBar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const onLogOut = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      {user.userInfo && (
        <div className="sb-wrapper">
          <div className="sb-container">
            <Link to="/profile-recruiter-page">
              <div className="sb-top">
                <div className="sb-user-wrapper">
                  <AccountCircleOutlinedIcon className="sb-user-icon" />
                  <div className="sb-user-name">
                    {user.userInfo?.profile.fullName}
                  </div>
                  <ArrowForwardIosIcon className="right-arrow" />
                </div>
                <div onClick={onLogOut} className="sb-logout">
                  ログアウト
                </div>
              </div>
            </Link>
            <div className="sb-list">
              <Link to="/joblistings_management">
                <span className="sb-post-and-manage">求人投稿・管理</span>
              </Link>
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
              <button className="btn-lg btn-fill">
                求人投稿
              </button>
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PostAndManageSideBar;
