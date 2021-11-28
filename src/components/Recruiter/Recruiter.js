import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import InputTextAreaAndLabel from "./InputTextAreaAndLabel";
import InputTextAndLabel from "../Apply/InputTextAndLabel";
import { auth } from "../../firebase/firebase";
import RadioForm from "../Apply/RadioForm";
import { insertUser } from "../../API/dbutils";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import "./Recruiter.scss";

const info = {};

function Recruiter() {
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [mustHave, setMustHave] = useState("");
  const [niceToHave, setNiceToHave] = useState("");
  const [projectDetail, setProjectDetail] = useState("");

  const USER_TYPE = "recruiter";

  const onSubmit = (e) => {
    e.preventDefault();
    const postingInfo = {
      profile: {
        fullName,
        email,
        companyAddress,
        lookingFor,
        mustHave,
        niceToHave,
        projectDetail,
      },
      userType: USER_TYPE,
    };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        insertUser(postingInfo, userCredential.user.uid);
        setStep(step + 1);
      })
      .catch((e) => {
        console.error(`Error happened: ${e}`);
      });
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
  };

  let contents = <></>;
  switch (step) {
    case 0:
      contents = (
        <>
          <InputTextAndLabel
            label="FULL NAME"
            placeholder="Your Name"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <InputTextAndLabel
            label="EMAIL"
            placeholder="Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputTextAndLabel
            label="PASSWORD"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputTextAndLabel
            label="COMPANY ADDRESS"
            placeholder="Company Address"
            type="text"
            onChange={(e) => setCompanyAddress(e.target.value)}
            value={companyAddress}
          />
          <RadioForm
            label=" I AM LOOKING FOR / 探している職種について"
            options={optionData.businessLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
          />
          <RadioForm
            label="HOW MUCH DO YOU NEED A COMMITMENT? / コミット時間について"
            options={optionData.businessCommitment}
            onChange={(e) => setLookingFor(e.target.value)}
          />
          <div className="buttonContainer">
            <Button variant="contained" className="button" type="submit">
              next
            </Button>
          </div>
        </>
      );
      break;
    case 1:
      contents = (
        <>
          <InputTextAndLabel
            label="MUST HAVE"
            placeholder="必要なスキルや経験を記入ください"
            type="text"
            onChange={(e) => setMustHave(e.target.value)}
            value={mustHave}
          />
          <InputTextAndLabel
            label="NICE TO HAVE"
            placeholder="持っていた場合尚良いスキルや経験を記入ください"
            type="text"
            onChange={(e) => setNiceToHave(e.target.value)}
            value={niceToHave}
          />
          <InputTextAreaAndLabel
            label="PROJECT DETAIL"
            placeholder="簡単なプロジェクト概要について記入下さい。後ほどインタビューにて詳細を伺います。"
            type="text"
            onChange={(e) => setProjectDetail(e.target.value)}
            value={projectDetail}
          />
          <div className="buttonContainer">
            <Button variant="contained" className="button" type="submit">
              REGISTER
            </Button>
          </div>
          <div className="link-line">
            <button
              className="previousButton"
              onClick={(e) => handleClick(e, step - 1, contents)}
            >
              ＜ PREVIOUS
            </button>
          </div>
        </>
      );
      break;
    case 2:
      contents = (
        <>
          <div className="thxBox">
            <h2 className="thxTitle">Thank you for Connecting</h2>
            <p className="sentence">
              この度はプロジェクトの詳細をご共有頂き有難うございました。
              <br />
              <br />
              よりお客様のニーズを理解するため、専任のコンサルタントがプロセス全体を通してお客様をサポートします。以下のLinkよりプロジェクト・求人に関するMTGを予約してください。
              <br />
              <br />
              尚現在はα版として稼働しております。β版ローンチは2022年1月を目指しておりますので、もうしばしお待ちいただけましたら幸いです。
              <br />
            </p>
            <div className="buttonContainer">
              <Button variant="contained" className="button" type="button">
                面談を予約する
              </Button>
            </div>
            <div className="link-line">
              <Link to="/" className="previousButton">
                ホームへ戻る
              </Link>
            </div>
          </div>
        </>
      );
      break;

    default:
      contents = <p>Unknown stepIndex</p>;
  }

  return (
    <div className="main-recruiter">
      <BlueSidePart />
      <div className="rightBox">
        {step !== 2 && (
          <>
            <h2 className="title">HIRE THE GLOBAL DEV TEAMS</h2>
            <p className="subtitle">
              正確なマッチングの為に詳細な情報をお伝え下さい
            </p>
          </>
        )}
        <form
          onSubmit={
            step === 1 ? onSubmit : (e) => handleClick(e, step + 1, contents)
          }
          className="form"
        >
          {contents}
        </form>
      </div>
    </div>
  );
}

export default Recruiter;
