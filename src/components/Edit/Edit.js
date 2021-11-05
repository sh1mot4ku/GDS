import React from "react";
import "./Edit.scss";

function Edit() {
  return (
    <div className="main-edit">
      <div className="edit-container">
        <img alt="" src="/image/icon-user.png" className="icon" />
        <div>
          <div className="edit-name">山田 太郎</div>
          <div className="edit-country">Asia</div>
          <button className="edit-button">プロフィール編集</button>
        </div>
      </div>
      <div className="edit-container">
        <div className="edit-title">FULL NAME</div>
        <div className="edit-data">山田 太郎</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">EMAIL</div>
        <div className="edit-data">sample@lraough.com</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">PASSWORD</div>
        <div className="edit-data">********</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">LOOKING FOR</div>
        <div className="edit-data">FULL-TIME EMPLOYMENT</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">LINK 1</div>
        <div className="edit-data">https://www.linkedin.com/in/example</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">LINK 2</div>
        <div className="edit-data">https://github.com/example</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">LINK 3</div>
        <div className="edit-data">https://lraough.com/</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">ENGLISH LEVEL</div>
        <div className="edit-data">日常会話レベル</div>
      </div>
      <div className="edit-container">
        <div className="edit-title">職種</div>
        <div className="edit-data">
          SOFTWARE ENGINEER / ソフトウェアエンジニア
        </div>
      </div>
    </div>
  );
}

export default Edit;
