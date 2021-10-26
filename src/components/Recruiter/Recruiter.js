import React, { useState } from "react";
import { Button } from "@material-ui/core";
import InputTextAreaAndLabel from "./InputTextAreaAndLabel";
import InputTextAndLabel from "../Apply/InputTextAndLabel";
import InputSelect from "../Apply/InputSelect";
import { auth } from "../../firebase/firebase";
import { v4 as uuid } from 'uuid';
import RadioForm from "../Apply/RadioForm";
import "./Recruiter.scss";
import { insertUser } from "../../API/dbutils";
const info = {};

function Recruiter() {
  // const {user, setUser} = useContext(UserContext);
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Japan");
  const [companyLocation, setCompanyLocation] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [mustSkills, setMustSkills] = useState("");
  const [niceSkills, setNiceSkills] = useState("");
  const [description, setDescription] = useState("");

  const USER_TYPE_CLIENT = "client";

  const onSubmit = (e) => {
    e.preventDefault();
    const postingInfo = {
      profile: {
        fullName,
        email,
        password,
        location,
        companyLocation,
        lookingFor,
        mustSkills,
        niceSkills,
        description  
      },
      userType: USER_TYPE_CLIENT,
      uid: uuid()
    };
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // setUser(postingInfo);
        insertUser(postingInfo, userCredential.user.uid);
        setStep(step + 1);
      })
      .catch(e => {
        console.error(`Error happened: ${e}`);
      })
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

  const countries = [
    {
      value: "Japan",
    },
    {
      value: "USA",
    },
    {
      value: "Canada",
    },
    {
      value: "Korea",
    },
    {
      value: "Chinese",
    },
  ];

  const levelOfEnglish = [
    {
      value: "日常会話、旅行トラブル対応レベル",
    },
    {
      value: "ビジネス会話、プレゼンレベル",
    },
    {
      value: "簡単通訳、ディスカッションレベル",
    },
    {
      value: "ネイティブレベル",
    },
  ];

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
          <InputSelect
            label="LOCATION"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            options={countries}
          />
          <InputTextAndLabel
            label="COMPANY LOCATION"
            placeholder="Company Location"
            type="text"
            onChange={(e) => setCompanyLocation(e.target.value)}
            value={companyLocation}
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
            <button className="loginButton">ログインはこちら</button>
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
            onChange={(e) => setMustSkills(e.target.value)}
            value={mustSkills}
          />
          <InputTextAndLabel
            label="NICE TO HAVE"
            placeholder="持っていた場合尚良いスキルや経験を記入ください"
            type="text"
            onChange={(e) => setNiceSkills(e.target.value)}
            value={niceSkills}
          />
          <InputTextAreaAndLabel
            label="PROJECT DESCRIPTION"
            placeholder="簡単なプロジェクト概要について記入下さい。後ほどインタビューにて詳細を伺います。"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <div className="buttonContainer">
            <Button variant="contained" className="button" type="submit">
              next
            </Button>
          </div>
        </>
      );
      break;
    case 2:
      contents = (
        <>
          <div className="thxBox">
            <h2 className="thxTitle">Thank you for Applying</h2>
            <p className="sentence">
              この度はGlobal
              Developersへのご興味を頂き誠にありがとうございます。
              <br />
              <br />
              ご応募頂いた皆様には、1週間以内にご連絡を改めさせて頂きます。
              <br />
              今後のプロセスについては、今までのご経験についてより詳しく知るための面談や面接が行われる予定です。
              <br />
              審査後に改めてメールにてお知らせ致します。
              <br />
              <br />
              尚現在はα版として運用しており、β版ローンチは2022年1月を目指しております。
              <br />
              本格ローンチまでに、お友達へのご紹介など含めて温かく見守って頂けましたら幸いです。今後とも何卒宜しくお願い致します。
            </p>
            <Button variant="contained" className="button" >
              ホームへ戻る
            </Button>
          </div>
        </>
      );
      break;

    default:
      contents = <p>Unknown stepIndex</p>;
  }

  return (
    <div className="main">
      <div className="leftBox">
        <img alt="" src="/image/logo-white 1.png" className="logo" />
        <img alt="" src="/image/remoteStack.png" className="remoteStack" />
      </div>
      <div className="rightBox">
        { step !== 2 && <><h2 className="title">HIRE THE GLOBAL DEV TEAMS</h2>
        <p className="subtitle">正確なマッチングの為に詳細な情報をお伝え下さい</p></>}
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
