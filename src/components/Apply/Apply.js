import React, { useState } from "react";
import { Button, List } from "@material-ui/core";
import InputText from "../ui/InputText";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import InputLabel from "@mui/material/InputLabel";
import InputSelect from "../ui/InputSelect";
import { auth } from "../../firebase/firebase";
import RadioForm from "../ui/RadioForm";
import { insertUser } from "../../API/dbutils";
import { Link } from "react-router-dom";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
// import { UserContext } from "../../context/user-context";
import "./Apply.scss";

const info = {};

function Apply() {
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Japan");
  const [lookingFor, setLookingFor] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [description, setDescription] = useState("");

  const USER_TYPE = "developer";

  const onSubmit = (e) => {
    e.preventDefault();
    const postingInfo = {
      profile: {
        fullName,
        email,
        location,
        lookingFor,
        links: { link1, link2, link3 },
        englishLevel,
        description,
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
      value: "China",
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
            placeholder="YOUR NAME"
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
          <RadioForm
            label="LOOKING FOR"
            options={optionData.userLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
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
          <InputLabel required>
            YOUR PROFILE (LinkedIn / GitHub / Website etc)
          </InputLabel>
          <InputLabel shrink={true} className="link-input-label-sm">
            1つ以上のLinkを記載してください。出来るだけSimpleにする為、CVやResumeのアップロードは不要です！
          </InputLabel>
          <InputText
            isRequired={true}
            placeholder="https://www.linkedin.com/in/example"
            type="text"
            onChange={(e) => setLink1(e.target.value)}
            value={link1}
          />
          <InputText
            isRequired={false}
            placeholder="https://github.com/example"
            type="text"
            onChange={(e) => setLink2(e.target.value)}
            value={link2}
          />
          <InputText
            isRequired={false}
            placeholder="https://lraough.com/"
            type="text"
            onChange={(e) => setLink3(e.target.value)}
            value={link3}
          />
          <InputSelect
            label="YOUR ENGLISH LEVEL"
            placeholder="ご自身の英語レベルについて教えてください"
            type="text"
            onChange={(e) => setEnglishLevel(e.target.value)}
            value={englishLevel}
            options={levelOfEnglish}
          />
          <RadioForm
            label="LOOKING FOR"
            options={optionData.userDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="buttonContainer">
            <Button variant="contained" className="button" type="submit">
              REGISTER
            </Button>
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
            <Link to="/">
              <Button variant="contained" className="button">
                ホームへ戻る
              </Button>
            </Link>
          </div>
        </>
      );
      break;

    default:
      contents = <p>Unknown stepIndex</p>;
  }

  return (
    <div className="main-apply">
      <BlueSidePart />
      <div className="rightBox">
        {step !== 2 && <h2 className="title">JOIN AS A GLOBAL DEVELOPER</h2>}
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

export default Apply;
