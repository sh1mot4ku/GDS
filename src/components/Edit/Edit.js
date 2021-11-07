import React, { useState } from "react";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "../Apply/InputTextAndLabel";
import InputText from "../Apply/InputText";
import InputSelect from "../Apply/InputSelect";
import RadioForm from "../Apply/RadioForm";
import { insertUser } from "../../API/dbutils";
import "./Edit.scss";
// import { UserContext } from "../../context/user-context";
const info = {};

function Edit() {
  // const {user, setUser} = useContext(UserContext);
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Japan");
  const [lookingFor, setLookingFor] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [description, setDescription] = useState("");

  const USER_TYPE_CLIENT = "client";

  // useEffect(() => {
  //   console.log(user)
  // }, [user])

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

    // setUser(postingInfo);
    insertUser(postingInfo);
    setStep(step + 1);
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

  return (
    <div className="main-edit">
      <div className="pf-container">
        <img alt="" src="/image/icon-user.png" className="icon" />
        <div>
          <div className="pf-name">山田 太郎</div>
          <div className="pf-country">Asia</div>
          <button className="pf-button">プロフィール編集</button>
        </div>
      </div>
      <div className="edit-container">
        <InputTextAndLabel
          label="FULL NAME"
          placeholder="YOUR NAME"
          type="text"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      </div>
      <div className="edit-container">
        <InputTextAndLabel
          label="EMAIL"
          placeholder="Email Address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="edit-container">
        <InputTextAndLabel
          label="PASSWORD"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="edit-container">
        <InputSelect
          label="LOCATION"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          options={countries}
        />
      </div>
      <div className="edit-container">
        <RadioForm
          label="LOOKING FOR"
          options={optionData.userLookingFor}
          onChange={(e) => setLookingFor(e.target.value)}
        />
      </div>
      <div className="edit-container">
        <InputTextAndLabel
          label="YOUR PROFILE (LinkedIn / GitHub / Website)"
          placeholder="https://www.linkedin.com/in/example"
          type="text"
          onChange={(e) => setLinkedin(e.target.value)}
          value={linkedin}
        />
      </div>
      <div className="edit-container">
        <InputText
          placeholder="https://github.com/example"
          type="text"
          onChange={(e) => setGithub(e.target.value)}
          value={github}
        />
      </div>
      <div className="edit-container">
        <InputText
          placeholder="https://lraough.com/"
          type="text"
          onChange={(e) => setWebsite(e.target.value)}
          value={website}
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
    </div>
  );
}

export default Edit;
