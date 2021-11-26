import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import InputTextAreaAndLabel from "./InputTextAreaAndLabel";
import InputTextAndLabel from "../Apply/InputTextAndLabel";
import { auth } from "../../firebase/firebase";
import RadioForm from "../Apply/RadioForm";
import { insertUser } from "../../API/dbutils";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import "./Recruiter.scss";
import validator from "validator";

const info = {};

function Recruiter() {
  const [step, setStep] = useState(0);
  const [newStep, setNewStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [commitment, setCommitment] = useState("");
  const [mustHave, setMustHave] = useState("");
  const [niceToHave, setNiceToHave] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [companyAddressError, setCompanyAddressError] = useState(null);
  const [mustHaveError, setMustHaveError] = useState(null);
  const [niceToHaveError, setNiceToHaveError] = useState(null);
  const [projectDetailError, setProjectDetailError] = useState(null);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isClientValidationPassed, setIsClientValidationPassed] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const USER_TYPE = "recruiter";

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
      case "company-address":
        validator.isLength(e.target.value, 0, 300) &&
          setCompanyAddress(e.target.value);
        (companyAddressError || companyAddressError === null) &&
          setCompanyAddressError(false);
        break;
      case "must-have":
        validator.isLength(e.target.value, 0, 500) &&
          setMustHave(e.target.value);
        (mustHaveError || mustHaveError === null) && setMustHaveError(false);
        break;
      case "niceTo-have":
        validator.isLength(e.target.value, 0, 500) &&
          setNiceToHave(e.target.value);
        (niceToHaveError || niceToHaveError === null) &&
          setNiceToHaveError(false);
        break;
      case "project-detail":
        validator.isLength(e.target.value, 0, 1000) &&
          setProjectDetail(e.target.value);
        (projectDetailError || projectDetailError === null) &&
          setProjectDetailError(false);
        break;
      default:
        console.log("unexpected error occured");
    }
  };
  /* ------------------------ Validator for each input ------------------------ */
  const validateAndTailorEmail = (inputEmail) => {
    console.log("validateAndTailorEmail() called");
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
      // /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
      /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9~`! @#\$%\^&*()_\-\+=\{\[\}\]\|\\:;"'<,>\.\?/]{7,32}$/;
    if (!regex.test(inputPassword) || inputPassword.length < 7) {
      setPasswordError(true);
    } else {
      setPasswordError(
        (prevState) => (prevState || prevState === null) && false
      );
    }
  };

  const validateAndTailorInput = (input, whatInput) => {
    if (!input.match(/\S/g)) {
      switch (whatInput) {
        case "fullname":
          setFullName("");
          setNameError(true);
          break;
        case "company-address":
          setCompanyAddress("");
          setCompanyAddressError(true);
          break;
        case "must-have":
          setMustHave("");
          setMustHaveError(true);
          break;
        case "niceTo-have":
          setNiceToHave("");
          setNiceToHaveError(true);
          break;
        case "project-detail":
          setProjectDetail("");
          setProjectDetailError(true);
          break;
        default:
          console.log("unexpected error occured");
      }
    } else {
      const trimedInput = input.trim();
      switch (whatInput) {
        case "fullname":
          setFullName(trimedInput);
          setNameError(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        case "company-address":
          setCompanyAddress(trimedInput);
          setCompanyAddressError(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        case "must-have":
          setMustHave(trimedInput);
          setMustHaveError(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        case "niceTo-have":
          setNiceToHave(trimedInput);
          setNiceToHaveError(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        case "project-detail":
          setProjectDetail(trimedInput);
          setProjectDetailError(
            (prevState) => (prevState || prevState === null) && false
          );
          break;
        default:
          console.log("unexpected error occured");
      }
    }
  };
  /* -------------------------------------------------------------------------- */

  // fired when register button is pressed
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit clicked");
    validateAndTailorInput(mustHave, "must-have");
    validateAndTailorInput(niceToHave, "niceTo-have");
    validateAndTailorInput(projectDetail, "project-detail");
    setIsTyping(false);
  };

  // rendered after register button is pressed, and when inputting
  useEffect(() => {
    console.log(mustHaveError, niceToHaveError, projectDetailError, isTyping);
    if (
      mustHaveError === false &&
      niceToHaveError === false &&
      projectDetailError === false &&
      !isTyping
    ) {
      console.log("setIsClientValidationPassed(true);");
      setIsClientValidationPassed(true);
    }
  }, [mustHaveError, niceToHaveError, projectDetailError, isTyping]);

  // rendered after register button is pressed, when useEffect() above is run, and when firebase throuws an error
  useEffect(() => {
    if (isClientValidationPassed && !isSubmitted) {
      console.log("firebase useeffect");
      const postingInfo = {
        profile: {
          fullName,
          email,
          companyAddress,
          lookingFor,
          commitment,
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
          setMustHaveError(null);
          setNiceToHaveError(null);
          setProjectDetailError(null);
        });
    }
    console.log(isSubmitted);
  }, [isClientValidationPassed]);

  // fired when the next or previous button is clicked
  const handleClick = (e, newStep, userInfo) => {
    e.preventDefault();
    console.log("clicked");
    validateAndTailorInput(fullName, "fullname");
    validateAndTailorEmail(email);
    validatePassword(password);
    validateAndTailorInput(companyAddress, "company-address");
    setIsTyping(false);
    setNewStep(newStep);
    setIsClientValidationPassed((prevInfo) => prevInfo && false);
    firebaseErrorMessage.length !== 0 && setFirebaseErrorMessage("");
    contents = userInfo;
  };
  // rendered after next or previous button is clicked, and when inputting
  useEffect(() => {
    console.log(
      nameError,
      emailError,
      passwordError,
      companyAddressError,
      isTyping
    );
    if (
      nameError === false &&
      emailError === false &&
      passwordError === false &&
      companyAddressError === false &&
      !isTyping
    ) {
      info[step] = contents;
      setStep(newStep);
    }
  }, [
    nameError,
    emailError,
    passwordError,
    companyAddressError,
    newStep,
    isTyping,
  ]);

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

  let contents = <></>;
  switch (step) {
    case 0:
      contents = (
        <>
          <InputTextAndLabel
            label="FULL NAME"
            placeholder="Your Name"
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
          <InputTextAndLabel
            label="COMPANY ADDRESS"
            placeholder="Company Address"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={companyAddress}
            name="company-address"
          />
          {companyAddressError ? (
            <p className="error-message">貴社所在地をご記入下さい</p>
          ) : (
            <div className="spacing"></div>
          )}
          <RadioForm
            label=" I AM LOOKING FOR / 探している職種について"
            options={optionData.businessLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
          />
          <RadioForm
            label="HOW MUCH DO YOU NEED A COMMITMENT? / コミット時間について"
            options={optionData.businessCommitment}
            onChange={(e) => setCommitment(e.target.value)}
            value={commitment}
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
            onChange={(e) => onHandleInputs(e)}
            value={mustHave}
            name="must-have"
          />
          {mustHaveError ? (
            <p className="error-message">こちらのフォームにご記入下さい</p>
          ) : (
            <div className="spacing"></div>
          )}
          <InputTextAndLabel
            label="NICE TO HAVE"
            placeholder="持っていた場合尚良いスキルや経験を記入ください"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={niceToHave}
            name="niceTo-have"
          />
          {niceToHaveError ? (
            <p className="error-message">こちらのフォームにご記入下さい</p>
          ) : (
            <div className="spacing"></div>
          )}
          <InputTextAreaAndLabel
            label="PROJECT DETAIL"
            placeholder="簡単なプロジェクト概要について記入下さい。後ほどインタビューにて詳細を伺います。"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={projectDetail}
            name="project-detail"
          />
          {projectDetailError ? (
            <p className="error-message">こちらのフォームにご記入下さい</p>
          ) : (
            <div className="spacing"></div>
          )}
          {firebaseErrorMessage.length !== 0 ? (
            <p className="error-message firebase-err-message">
              {firebaseErrorMessage}
            </p>
          ) : (
            <div className="spacing"></div>
          )}
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
