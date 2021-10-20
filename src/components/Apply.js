import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import InputText from "./InputText.jsx";
import InputTextAndLabel from "./InputTextAndLabel.jsx";
import "./Apply.scss";
import RadioForm from "./RadioForm.jsx";
import { insertUser } from "../API/dbutils";
import { UserContext } from "../context";
const info = {};

function Apply() {

  const [user, setUser] = useContext(UserContext);
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [description, setDescription] = useState("");

  const USER_TYPE_CLIENT = "client";

  const onSubmit = (e) => {
    e.preventDefault();
    const postingInfo = {
      fullName,
      email,
      password,
      location,
      lookingFor,
      linkedin,
      github,
      website,
      englishLevel,
      description,
      userType: USER_TYPE_CLIENT,
    };

    setUser(postingInfo);
    insertUser(postingInfo);
    // setValue("");
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

  const handleClick = (e, newStep, userInfo) => {
    e.preventDefault();
    info[step] = userInfo;
    setStep(newStep);
    // setValue("");
    console.log(e.target.value);
    console.log(`val: ${value}`);

  };

  let contents = <></>;
  switch (step) {
    case 0:
      console.log("RUN1");
      contents = (
        <>
          <InputTextAndLabel
            label="FULL NAME"
            placeholder="YOUR NAME"
            type="text"
            value={value}
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
        </>
      );
      break;
    case 1:
      console.log("RUN2");
      contents = (
        <>
          <InputTextAndLabel
            label="YOUR PROFILE (LinkedIn / GitHub / Website)"
            placeholder="https://www.linkedin.com/in/example"
            type="text"
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <InputText
            placeholder="https://github.com/example"
            type="text"
            onChange={(e) => setGithub(e.target.value)}
          />
          <InputText
            placeholder="https://lraough.com/"
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
          />
          <InputTextAndLabel
            label="YOUR ENGLISH LEVEL"
            placeholder="ご自身の英語レベルについて教えてください"
            type="text"
            onChange={(e) => setEnglishLevel(e.target.value)}
          />
          <RadioForm
            label="LOOKING FOR"
            options={optionData.userDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      );
      break;

    default:
      console.log("other", step);
      contents = <p>Other</p>;
  }

  return (
    <div className="main">
      <div className="leftBox">
        <img alt="" src="/image/logo-white 1.png" className="logo" />
        <img alt="" src="/image/remoteStack.png" className="remoteStack" />
      </div>
      <div className="rightBox">
        <h2 className="title">JOIN AS A GLOBAL DEVELOPER</h2>
        <form
          onSubmit={
            step === 1 ? onSubmit : (e) => handleClick(e, step + 1, contents)
          }
          className="form"
        >
          {contents}
          <div className="buttonContainer">
            <Button
              color="primary"
              variant="contained"
              className="button"
              type="submit"
              onClick={() => setValue("")}
            >
              next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Apply;
