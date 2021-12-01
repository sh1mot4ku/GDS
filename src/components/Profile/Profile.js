import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Profile.scss";

const Profile = () => {
  const { uid, userInfo } = useSelector((state) => state.user);

  return (
    <>
      {uid ? (
        <div className="main-profile">
          <div className="pf-container">
            <img alt="" src="/image/icon-user.png" className="icon" />
            <div>
              <div className="pf-name">{userInfo.profile.fullName}</div>
              <div className="pf-country">{userInfo.profile.location}</div>
              <Link to="/profile_edit">
                <button className="pf-button">プロフィール編集</button>
              </Link>
            </div>
          </div>
          <div className="pf-container">
            <div className="pf-title">お名前</div>
            <div className="pf-data">{userInfo.profile.fullName}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">メールアドレス</div>
            <div className="pf-data">{userInfo.profile.email}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">パスワード</div>
            <div className="pf-data">{"*".repeat(userInfo.profile.pl)}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">求める雇用形態</div>
            <div className="pf-data">{userInfo.profile.lookingFor}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">LINK 01</div>
            <div className="pf-data">{userInfo.profile.links.link1}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">LINK 02</div>
            <div className="pf-data">{userInfo.profile.links.link2}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">LINK 03</div>
            <div className="pf-data">{userInfo.profile.links.link3}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">英語レベル</div>
            <div className="pf-data">{userInfo.profile.englishLevel}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">ご自身の職種</div>
            <div className="pf-data">{userInfo.profile.description}</div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
