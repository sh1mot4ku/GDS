import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "./InputTextAndLabel.jsx";
import "./Apply.scss";
import RadioForm from "./RadioForm.jsx";
import { insertUser } from "../API/dbutils";
import { UserContext } from "../context";

function Apply() {
  const [user, setUser] = useContext(UserContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [lookingFor, setLookingFor] = useState("");

  const USER_TYPE_CLIENT = "client";

  const onSubmit = (e) => {
    e.preventDefault();
    const postingInfo = {
      fullName,
      email,
      password,
      location,
      lookingFor,
      userType: USER_TYPE_CLIENT,
    };

    setUser(postingInfo);
    insertUser(postingInfo);
  };

  const optionData = {
    userLookingFor: [
      "FULL-TIME EMPLOYMENT",
      "CONTRACT / FREELANCE JOBS",
      "BOTH PERMANENT AND CONTRACT",
    ],
    userDescription: [
      "SOFTWARE ENGINEER / ソフトウェアエンジニア",
      "PRODUCT DESIGNER / プロダクトデザイナー",
      "PRODUCT MANAGER / プロダクトマネージャー",
      "GROWTH HACKER / グロースハッカー",
      "BUSINESS OPS / ビジネスオペレーションズ",
    ],
    businessLookingFor: [
      "HIRING DEVELOPERS / エンジニア",
      "HIRING DESIGNERS / デザイナー",
      "HIRING BUSINESS OPS / ビジネスサイド",
    ],
    businessCommitment: [
      "FULL TIME (40 or more hrs/week) / 正社員",
      "PART TIME (Less than 40hrs/week) / フリーランサー",
      "I'LL DECIDE LATER / まだ決めていない",
    ],
  };

  return (
    <>
      <div className="main">
        <div className="leftBox">
          <img alt="" src="/image/logo-white 1.png" className="logo" />
          <img alt="" src="/image/remoteStack.png" className="remoteStack" />
        </div>
        <div className="rightBox">
          <h2 className="title">JOIN AS A GLOBAL DEVELOPER</h2>

          <form onSubmit={onSubmit} className="form">
            <InputTextAndLabel
              label="FULL NAME"
              placeholder="YOUR NAME"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputTextAndLabel
              label="EMAIL"
              placeholder="Email Address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputTextAndLabel
              label="PASSWORD"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputTextAndLabel
              label="LOCATION"
              placeholder="Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
            <RadioForm
              label="LOOKING FOR"
              options={optionData.userLookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
            />
            <div className="buttonContainer">
              <Button
                color="primary"
                variant="contained"
                className="button"
                type="submit"
              >
                next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Apply;
