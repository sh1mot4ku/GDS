import React from "react";
import "./Profile.scss";

function Profile() {
  return (
    <div className="main-profile">
      <div className="pf-container">
        <img alt="" src="/image/icon-user.png" className="icon" />
        <div>
          <div className="pf-name">山田 太郎</div>
          <div className="pf-country">Asia</div>
          <button className="pf-button">プロフィール編集</button>
        </div>
      </div>
      <div className="pf-container">
        <div className="pf-title">FULL NAME</div>
        <div className="pf-data">山田 太郎</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">EMAIL</div>
        <div className="pf-data">sample@lraough.com</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">PASSWORD</div>
        <div className="pf-data">********</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">LOOKING FOR</div>
        <div className="pf-data">FULL-TIME EMPLOYMENT</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">LINK 1</div>
        <div className="pf-data">https://www.linkedin.com/in/example</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">LINK 2</div>
        <div className="pf-data">https://github.com/example</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">LINK 3</div>
        <div className="pf-data">https://lraough.com/</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">ENGLISH LEVEL</div>
        <div className="pf-data">日常会話レベル</div>
      </div>
      <div className="pf-container">
        <div className="pf-title">職種</div>
        <div className="pf-data">
          SOFTWARE ENGINEER / ソフトウェアエンジニア
        </div>
      </div>
    </div>
  );
}

export default Profile;
