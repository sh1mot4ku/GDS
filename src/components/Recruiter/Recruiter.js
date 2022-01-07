import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../ui/Button.scss";
import InputTextAreaAndLabel from "../ui/InputTextAreaAndLabel";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import RadioForm from "../ui/RadioForm";
import { auth } from "../../firebase/firebase";
import { insertUser } from "../../API/dbutils";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import { optionData } from "../../data/applyingInfo/recruiter";
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
  const [emailInvalidError, setEmailInvalidError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordInvalidError, setPasswordInvalidError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [companyAddressError, setCompanyAddressError] = useState(null);
  const [mustHaveError, setMustHaveError] = useState(null);
  const [niceToHaveError, setNiceToHaveError] = useState(null);
  const [projectDetailError, setProjectDetailError] = useState(null);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isClientValidationPassed, setIsClientValidationPassed] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

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
        (emailInvalidError || emailInvalidError === null) &&
          setEmailInvalidError(false);
        (emailError || emailError === null) && setEmailError(false);
        break;
      case "password":
        validator.isLength(e.target.value, 0, 32) &&
          setPassword(e.target.value);
        (passwordInvalidError || passwordInvalidError === null) &&
          setPasswordInvalidError(false);
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
    if (!validator.isEmail(inputEmail)) {
      setEmailInvalidError(true);
    } else if (!inputEmail.match(/\S/g)) {
      setEmail("");
      setEmailError(true);
    } else {
      const emailWithoutWhiteSpace = inputEmail.replace(/\s+/g, "");
      setEmail(emailWithoutWhiteSpace);
      setEmailInvalidError(
        (prevState) => (prevState || prevState === null) && false
      );
      setEmailError((prevState) => (prevState || prevState === null) && false);
    }
  };

  const validatePassword = (inputPassword) => {
    const regex =
      // /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
      /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9~`! @#\$%\^&*()_\-\+=\{\[\}\]\|\\:;"'<,>\.\?/]{7,32}$/;
    if (!regex.test(inputPassword) || inputPassword.length < 7) {
      setPasswordInvalidError(true);
    } else {
      setPasswordInvalidError(
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
    setIsRegistering(false);
  };

  // rendered after register button is pressed, and when inputting
  useEffect(() => {
    console.log(mustHaveError, niceToHaveError, projectDetailError, isTyping);
    if (
      mustHaveError === false &&
      niceToHaveError === false &&
      projectDetailError === false &&
      !isTyping &&
      !isRegistering
    ) {
      setIsClientValidationPassed(true);
    }
  }, [
    mustHaveError,
    niceToHaveError,
    projectDetailError,
    isTyping,
    isRegistering,
  ]);

  // rendered after register button is pressed, when useEffect() above is run, and when firebase throuws an error
  useEffect(() => onSubscription(), [isClientValidationPassed]);

  const onSubscription = async () => {
    if (isClientValidationPassed && !isSubmitted) {
      try {
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
            photoUrl: "",
          },
          userType: USER_TYPE,
        };
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        // add user to Firebase Real-time Database
        await insertUser(postingInfo, userCredential.user.uid);
        // setStep(step + 1);
        console.log("sent to firebase");
        setIsSubmitted(true);

        // Send email for verificate user's email address
        await auth.currentUser.sendEmailVerification({
          url: `${window.location.origin}/thank-you`,
        });
        history.push({
          pathname: "/send-mail-confirm",
          state: { email },
        });
      } catch (error) {
        console.error(`Error happened: ${error}`);
        switch (error.code) {
          case "auth/invalid-email":
            setFirebaseErrorMessage("メールアドレスが無効です");
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
              "パスワードは7文字以上、文字と数字を組み合わせて入力してください"
            );
            break;
          default:
            setFirebaseErrorMessage(
              "予期しないエラーが発生しました。再度登録してください。"
            );
        }
        setIsClientValidationPassed(false);
        setIsRegistering(true);
      }
    }
    console.log(isSubmitted);
  };

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
    setIsClientValidationPassed(false);
    !isRegistering && setIsRegistering(true);
    firebaseErrorMessage.length !== 0 && setFirebaseErrorMessage("");
    contents = userInfo;
  };
  // rendered after next or previous button is clicked, and when inputting
  useEffect(() => {
    console.log(
      nameError,
      emailInvalidError,
      emailError,
      passwordInvalidError,
      passwordError,
      companyAddressError,
      isTyping
    );
    if (
      nameError === false &&
      emailInvalidError === false &&
      emailError === false &&
      passwordInvalidError === false &&
      passwordError === false &&
      companyAddressError === false &&
      !isTyping
    ) {
      info[step] = contents;
      console.log(info);
      setStep(newStep);
    }
  }, [
    nameError,
    emailInvalidError,
    emailError,
    passwordInvalidError,
    passwordError,
    companyAddressError,
    newStep,
    isTyping,
  ]);

  let contents = <></>;
  switch (step) {
    case 0:
      contents = (
        <>
          <InputTextAndLabel
            label="お名前"
            placeholder="例)山田 太郎"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={fullName}
            name="fullname"
          />
          {nameError && (
            <p className="error-message">お名前が記入されていません</p>
          )}
          <InputTextAndLabel
            label="メールアドレス"
            placeholder="example@example.com"
            type="email"
            onChange={(e) => onHandleInputs(e)}
            value={email}
            name="email"
          />
          {emailError && (
            <p className="error-message">メールアドレスが記入されていません</p>
          )}
          {emailInvalidError && (
            <p className="error-message">メールアドレスが無効です</p>
          )}
          <InputTextAndLabel
            label="パスワード"
            placeholder="7文字以上の半角英数字"
            type="password"
            onChange={(e) => onHandleInputs(e)}
            value={password}
            name="password"
          />
          {passwordInvalidError && (
            <p className="error-message">
              7文字以上、文字と数字を組み合わせて入力してください
            </p>
          )}
          {passwordError && (
            <p className="error-message">パスワードを入力してください</p>
          )}
          <InputTextAndLabel
            label="会社所在地"
            placeholder="会社所在地を記入してください"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={companyAddress}
            name="company-address"
          />
          {companyAddressError && (
            <p className="error-message">会社所在地をご記入ください</p>
          )}
          <RadioForm
            label="募集職種"
            options={optionData.businessLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
          />
          <RadioForm
            label="コミット時間"
            options={optionData.businessCommitment}
            onChange={(e) => setCommitment(e.target.value)}
            value={commitment}
          />
          <div className="buttonContainer">
            <button className="btn-lg btn-fill" type="submit">
              NEXT
            </button>
          </div>
        </>
      );
      break;
    case 1:
      contents = (
        <>
          <InputTextAndLabel
            label="必須条件・スキル"
            placeholder="必須条件・スキルを記入ください"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={mustHave}
            name="must-have"
          />
          {mustHaveError && (
            <p className="error-message">
              必須条件・スキルが記入されていません
            </p>
          )}
          <InputTextAndLabel
            label="歓迎するスキル"
            placeholder="歓迎するスキルを記入ください"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={niceToHave}
            name="niceTo-have"
          />
          {niceToHaveError && (
            <p className="error-message">歓迎するスキルが記入されていません</p>
          )}
          <InputTextAreaAndLabel
            label="募集内容"
            placeholder="簡単なプロジェクト概要について記入下さい。後ほどインタビューにて詳細を伺います。"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={projectDetail}
            name="project-detail"
          />
          {projectDetailError && (
            <p className="error-message">募集内容が記入されていません</p>
          )}
          {firebaseErrorMessage.length !== 0 && (
            <p className="error-message firebase-err-message">
              {firebaseErrorMessage}
            </p>
          )}
          <div className="buttonContainer">
            <button className="btn-lg btn-fill" type="submit">
              REGISTER
            </button>
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
    default:
      contents = <p>Unknown stepIndex</p>;
  }

  return (
    <div className="main-recruiter">
      <BlueSidePart />
      <div className="rightBox-wrapper">
        <div className="rightBox">
          {step !== 2 && (
            <>
              <h2 className="title">HIRE THE GLOBAL DEV TEAMS</h2>
              <p className="subtitle">
                {step === 0
                  ? "正確なマッチングの為に詳細な情報をお伝え下さい"
                  : step === 1
                  ? "スキルや経験、プロジェクトの背景についてご共有ください"
                  : ""}
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
    </div>
  );
}

export default Recruiter;
