import React, { useState } from "react";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "../Apply/InputTextAndLabel";
import InputText from "../Apply/InputText";
import InputSelect from "../Apply/InputSelect";
import RadioForm from "../Apply/RadioForm";
import { useSelector } from "react-redux";
import {
  optionData,
  countries,
  levelOfEnglish,
} from "../../data/applyingInfo/client";
import "./ProfileEdit.scss";

const ProfileEdit = () => {
  const { uid, userInfo } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(userInfo.profile.fullName || "");
  const [email, setEmail] = useState(userInfo.profile.email || "");
  const [password, setPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [location, setLocation] = useState(
    userInfo.profile.location || "Japan"
  );
  const [lookingFor, setLookingFor] = useState(
    userInfo.profile.lookingFor || ""
  );
  const [link1, setLink1] = useState(userInfo.profile.links.link1 || "");
  const [link2, setLink2] = useState(userInfo.profile.links.link2 || "");
  const [link3, setLink3] = useState(userInfo.profile.links.link3 || "");
  const [englishLevel, setEnglishLevel] = useState(
    userInfo.profile.englishLevel || ""
  );
  const [description, setDescription] = useState(
    userInfo.profile.description || ""
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const postingInfo = {
      fullName,
      email,
      password,
      location,
      lookingFor,
      link1,
      link2,
      link3,
      englishLevel,
      description,
    };

    // updateUser(postingInfo);
  };

  return (
    <div className="main-edit">
      <form onSubmit={onSubmit}>
        <div className="pf-container">
          <img alt="" src="/image/icon-user.png" className="icon" />
          <div>
            <div className="pf-name">{fullName}</div>
            <div className="pf-country">{location}</div>
            <button className="pf-button">画像追加</button>
          </div>
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="お名前"
            placeholder="お名前"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="input"
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="メールアドレス"
            placeholder="メールアドレス"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="現在のパスワード"
            placeholder="現在のパスワードを入力してください"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="変更後のパスワード"
            placeholder="変更後のパスワードを入力してください"
            type="password"
            x
            onChange={(e) => setChangedPassword(e.target.value)}
            value={changedPassword}
          />
        </div>
        <div className="edit-container">
          <InputSelect
            label="ロケーション"
            placeholder="ロケーション"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            options={countries}
          />
        </div>
        <div className="edit-container">
          <RadioForm
            label="求める雇用形態"
            options={optionData.userLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="プロフィールリンク (LinkedIn / GitHub / Website)"
            placeholder="https://www.linkedin.com/in/example"
            type="text"
            onChange={(e) => setLink1(e.target.value)}
            value={link1}
          />

          <InputText
            placeholder="https://github.com/example"
            type="text"
            onChange={(e) => setLink2(e.target.value)}
            value={link2}
          />

          <InputText
            placeholder="https://lraough.com/"
            type="text"
            onChange={(e) => setLink3(e.target.value)}
            value={link3}
          />
        </div>
        <div className="edit-container">
          <InputSelect
            label="YOUR ENGLISH LEVEL"
            placeholder="ご自身の英語レベルについて教えてください"
            type="text"
            onChange={(e) => setEnglishLevel(e.target.value)}
            value={englishLevel}
            options={levelOfEnglish}
          />
        </div>
        <div className="edit-container">
          <RadioForm
            label="LOOKING FOR"
            options={optionData.userDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="buttonContainer">
          <Button variant="contained" className="button" type="submit">
            保存する
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
