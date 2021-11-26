import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import InputText from "./InputText.jsx";
import InputTextAndLabel from "./InputTextAndLabel.jsx";
import InputLabel from "@mui/material/InputLabel";
import InputSelect from "./InputSelect.jsx";
import { auth } from "../../firebase/firebase";
import RadioForm from "./RadioForm.jsx";
import { insertUser } from "../../API/dbutils";
import { Link } from "react-router-dom";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
// import { UserContext } from "../../context/user-context";
import "./Apply.scss";
import validator from "validator";

const info = {};

function Apply() {
  const [step, setStep] = useState(0);
  const [newStep, setNewStep] = useState(0);
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
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [link1Error, setLink1Error] = useState(null);
  const [link2Error, setLink2Error] = useState(false);
  const [link3Error, setLink3Error] = useState(false);
  const [englishLevelError, setEnglishLevelError] = useState(true);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isClientValidationPassed, setIsClientValidationPassed] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const USER_TYPE = "developer";

  //test
  useEffect(() => {
    console.log(englishLevelError);
  }, [englishLevelError]);
  //test
  useEffect(() => {
    console.log(`step: ${step}, newStep: ${newStep}`);
  }, [step, newStep]);

  const onHandleInputs = (e) => {
    !isTyping && setIsTyping(true);
    firebaseErrorMessage.length !== 0 && setFirebaseErrorMessage("");
    switch (e.target.name) {
      case "fullname":
        validator.isLength(e.target.value, 0, 50) &&
          setFullName(e.target.value);
        (nameError || nameError === null) && setNameError(false);
        break;
      case "email":
        validator.isLength(e.target.value, 0, 254) && setEmail(e.target.value);
        (emailError || emailError === null) && setEmailError(false);
        break;
      case "password":
        setPassword(e.target.value);
        (passwordError || passwordError === null) && setPasswordError(false);
        break;
      case "link1":
        validator.isLength(e.target.value, 0, 2100) && setLink1(e.target.value);
        (link1Error || link1Error === null) && setLink1Error(false);
        break;
      case "link2":
        validator.isLength(e.target.value, 0, 2100) && setLink2(e.target.value);
        (link2Error || link2Error === null) && setLink2Error(false);
        break;
      case "link3":
        validator.isLength(e.target.value, 0, 2100) && setLink3(e.target.value);
        (link3Error || link3Error === null) && setLink3Error(false);
        break;
      default:
        console.log("unexpected error occured");
    }
  };
  const onHandleEnglishLevel = (e) => {
    setEnglishLevelError(false);
    setEnglishLevel(e.target.value);
  };
  /* ------------------------ Validator for each input ------------------------ */
  const validateAndTailorName = (name) => {
    if (!name.match(/\S/g)) {
      setFullName("");
      setNameError(true);
    } else {
      const trimedName = name.trim();
      setFullName(trimedName);
      setNameError((prevState) => (prevState || prevState === null) && false);
    }
  };

  const validateAndTailorEmail = (inputEmail) => {
    if (!validator.isEmail(inputEmail)) {
      setEmailError(true);
    } else {
      const emailWithoutWhiteSpace = inputEmail.replace(/\s+/g, "");
      setEmail(emailWithoutWhiteSpace);
      setEmailError((prevState) => (prevState || prevState === null) && false);
    }
  };

  const validatePassword = (inputPassword) => {
    const regex =
      /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9~`! @#\$%\^&*()_\-\+=\{\[\}\]\|\\:;"'<,>\.\?/]{7,32}$/;
    if (!regex.test(inputPassword) || inputPassword.length < 7) {
      setPasswordError(true);
    } else {
      setPasswordError(
        (prevState) => (prevState || prevState === null) && false
      );
    }
  };

  const validateAndTailorUrl = (url, whatUrlInput) => {
    const trimedUrl = url.trim();
    if (validator.isURL(trimedUrl)) {
      switch (whatUrlInput) {
        case "link1":
          setLink1(trimedUrl);
          setLink1Error(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        case "link2":
          setLink2(trimedUrl);
          setLink2Error(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        case "link3":
          setLink3(trimedUrl);
          setLink3Error(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        default:
          console.log("unexpected error occured");
      }
    } else if (!url.match(/\S/g)) {
      switch (whatUrlInput) {
        case "link1":
          setLink1("");
          setLink1Error(true);
          break;
        case "link2":
          setLink2("");
          break;
        case "link3":
          setLink3("");
          break;
        default:
          console.log("unexpected error occured");
      }
    } else if (!validator.isURL(url) && url !== "") {
      switch (whatUrlInput) {
        case "link1":
          setLink1Error(true);
          break;
        case "link2":
          setLink2Error(true);
          break;
        case "link3":
          setLink3Error(true);
          break;
        default:
          console.log("unexpected error occured");
      }
    } else if (url === "") {
      switch (whatUrlInput) {
        case "link2":
          setLink2Error((prevInfo) => prevInfo && false);
          break;
        case "link3":
          setLink3Error((prevInfo) => prevInfo && false);
          break;
        default:
          console.log("unexpected error occured");
      }
    }
    console.log(`this is in the validate links ${link1}, ${link2}, ${link3}`);
  };
  /* -------------------------------------------------------------------------- */

  // fired when register button is pressed
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit clicked");
    validateAndTailorUrl(link1, "link1");
    validateAndTailorUrl(link2, "link2");
    validateAndTailorUrl(link3, "link3");
    setIsTyping(false);
  };

  // rendered after register button is pressed, and when inputting
  useEffect(() => {
    console.log(
      link1Error,
      link2Error,
      link3Error,
      englishLevelError,
      isTyping
    );
    if (
      link1Error === false &&
      link2Error === false &&
      link3Error === false &&
      englishLevelError === false &&
      !isTyping
    ) {
      console.log("setIsClientValidationPassed(true);");
      setIsClientValidationPassed(true);
    }
  }, [link1Error, link2Error, link3Error, isTyping]);

  // rendered after register button is pressed, when useEffect() above is run, and when firebase throuws an error
  useEffect(() => {
    console.log(
      "isClientValidationPassed" +
        isClientValidationPassed +
        ":" +
        "issubmitted:" +
        isSubmitted
    );
    if (isClientValidationPassed && !isSubmitted) {
      console.log("firebase useeffect");
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
          console.log("sent to firebase");
          setIsSubmitted(true);
        })
        .catch((error) => {
          console.error(`Error happened: ${error}`);
          switch (error.code) {
            case "auth/invalid-email":
              setFirebaseErrorMessage("メールアドレスの形式が無効です");
              break;
            case "auth/email-already-in-use":
              setFirebaseErrorMessage(
                "ご記入いただいたメールアドレスは既に使用されています"
              );
              break;
            case "auth/operation-not-allowed":
              setFirebaseErrorMessage(
                "メールアドレスまたはパスワードが有効ではありません"
              );
              break;
            case "auth/weak-password":
              setFirebaseErrorMessage(
                "パスワードは7文字以上の半角英数字記号で作成ください"
              );
              break;
            default:
              setFirebaseErrorMessage(
                "予期しないエラーが発生しました。再度登録してください。"
              );
          }
          setIsClientValidationPassed(false);
          setLink1Error(null);
        });
    }
    console.log(isSubmitted);
  }, [isClientValidationPassed]);
  // fired when the next or previous button is clicked
  const handleClick = (e, newStep, userInfo) => {
    e.preventDefault();
    validateAndTailorName(fullName);
    validateAndTailorEmail(email);
    validatePassword(password);
    setIsTyping(false);
    setNewStep(newStep);
    setIsClientValidationPassed((prevInfo) => prevInfo && false);
    firebaseErrorMessage.length !== 0 && setFirebaseErrorMessage("");
    contents = userInfo;
  };

  // rendered after next or previous button is clicked, and when inputting
  useEffect(() => {
    console.log(nameError, emailError, passwordError, isTyping);
    if (
      nameError === false &&
      emailError === false &&
      passwordError === false &&
      !isTyping
    ) {
      info[step] = contents;
      setStep(newStep);
    }
  }, [nameError, emailError, passwordError, newStep, isTyping]);

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

  let contents = <></>;
  switch (step) {
    case 0:
      contents = (
        <>
          <InputTextAndLabel
            label="FULL NAME"
            placeholder="YOUR NAME"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={fullName}
            name="fullname"
          />
          {nameError ? (
            <p className="error-message">お名前をご記入下さい</p>
          ) : (
            <div className="spacing"></div>
          )}
          <InputTextAndLabel
            label="EMAIL"
            placeholder="Email Address"
            type="email"
            onChange={(e) => onHandleInputs(e)}
            value={email}
            name="email"
          />
          {emailError ? (
            <p className="error-message">メールアドレスが無効です</p>
          ) : (
            <div className="spacing"></div>
          )}
          <InputTextAndLabel
            label="PASSWORD"
            placeholder="Password"
            type="password"
            onChange={(e) => onHandleInputs(e)}
            value={password}
            name="password"
          />
          {passwordError ? (
            <p className="error-message">
              パスワードは7文字以上32字以下、英数字と、記号(任意)を組み合わせてください。
            </p>
          ) : (
            <div className="spacing"></div>
          )}
          <InputSelect
            label="LOCATION"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            options={countries}
          />
          <div className="spacing-others"></div>
          <RadioForm
            label="LOOKING FOR"
            options={optionData.userLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
          />
          <div className="spacing-others"></div>
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
            onChange={(e) => onHandleInputs(e)}
            value={link1}
            name="link1"
          />
          {link1Error ? (
            <p className="error-message">有効なリンクを入力ください</p>
          ) : (
            <div className="spacing-link"></div>
          )}
          <InputText
            isRequired={false}
            placeholder="https://github.com/example"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={link2}
            name="link2"
          />
          {link2Error ? (
            <p className="error-message">有効なリンクを入力ください。</p>
          ) : (
            <div className="spacing-link"></div>
          )}
          <InputText
            isRequired={false}
            placeholder="https://lraough.com/"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={link3}
            name="link3"
          />
          {link3Error ? (
            <p className="error-message">有効なリンクを入力ください。</p>
          ) : (
            <div className="spacing-link"></div>
          )}
          <InputSelect
            label="YOUR ENGLISH LEVEL"
            placeholder="ご自身の英語レベルについて教えてください"
            type="text"
            onChange={(e) => onHandleEnglishLevel(e)}
            value={englishLevel}
            options={levelOfEnglish}
          />
          <div className="spacing-others"></div>
          <RadioForm
            label="LOOKING FOR"
            options={optionData.userDescription}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <div className="spacing-others"></div>
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
