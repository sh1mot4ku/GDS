import React, { useState, useEffect } from "react";
import "../ui/Button.scss";
import InputText from "../ui/InputText";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import InputLabel from "@mui/material/InputLabel";
import InputSelect from "../ui/InputSelect";
import { auth } from "../../firebase/firebase";
import RadioForm from "../ui/RadioForm";
import { insertUser } from "../../API/dbutils";
import { useHistory } from "react-router-dom";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import {
  optionData,
  countries,
  levelOfEnglish,
} from "../../data/applyingInfo/client";
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
  const [emailInvalidError, setEmailInvalidError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordInvalidError, setPasswordInvalidError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [linkError, setLinkError] = useState(null);
  const [link1Error, setLink1Error] = useState(null);
  const [link2Error, setLink2Error] = useState(false);
  const [link3Error, setLink3Error] = useState(false);
  const [englishLevelError, setEnglishLevelError] = useState(true);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isClientValidationPassed, setIsClientValidationPassed] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

  const USER_TYPE = "developer";

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
      case "link1":
        validator.isLength(e.target.value, 0, 2083) && setLink1(e.target.value);
        (link1Error || link1Error === null) && setLink1Error(false);
        (linkError || linkError === null) && setLinkError(false);
        break;
      case "link2":
        validator.isLength(e.target.value, 0, 2083) && setLink2(e.target.value);
        (link2Error || link2Error === null) && setLink2Error(false);
        break;
      case "link3":
        validator.isLength(e.target.value, 0, 2083) && setLink3(e.target.value);
        (link3Error || link3Error === null) && setLink3Error(false);
        break;
      default:
        console.log("unexpected error occured");
    }
  };
  const onHandleEnglishLevel = (e) => {
    !isTyping && setIsTyping(true);
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
      /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9~`! @#\$%\^&*()_\-\+=\{\[\}\]\|\\:;"'<,>\.\?/]{7,32}$/;
    if (!regex.test(inputPassword) || inputPassword.length < 7) {
      setPasswordInvalidError(true);
    } else {
      setPasswordInvalidError(
        (prevState) => (prevState || prevState === null) && false
      );
    }
  };

  const validateAndTailorUrl = (url, whatUrlInput) => {
    !isTyping && setIsTyping(true);
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
          setLinkError(true);
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
    }
    if (url === "") {
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
    // console.log(`this is in the validate links ${link1}, ${link2}, ${link3}`);
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
    setIsRegistering(false);
  };

  useEffect(() => {
    if (
      link1Error === false &&
      link2Error === false &&
      link3Error === false &&
      englishLevelError === false &&
      !isTyping &&
      !isRegistering
    ) {
      console.log("setIsClientValidationPassed(true);");
      setIsClientValidationPassed(true);
    }
  }, [link1Error, link2Error, link3Error, isTyping, isRegistering]);

  useEffect(() => onSubscription(), [isClientValidationPassed]);

  // rendered after register button is pressed, when useEffect() above is run, and when firebase throuws an error
  const onSubscription = async () => {
    if (isClientValidationPassed && !isSubmitted) {
      try {
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
            pl: password.length,
            photoUrl: "",
          },
          userType: USER_TYPE,
        };
        // create user at Firebase Authentication with email and password
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
        // setLink1Error(null);
      }
    }
    // console.log(isSubmitted);
  };

  // fired when the next or previous button is clicked
  const handleClick = (e, newStep, userInfo) => {
    e.preventDefault();
    validateAndTailorName(fullName);
    validateAndTailorEmail(email);
    validatePassword(password);
    setIsTyping(false);
    setNewStep(newStep);
    setIsClientValidationPassed(false);
    !isRegistering && setIsRegistering(true);
    firebaseErrorMessage.length !== 0 && setFirebaseErrorMessage("");
    contents = userInfo;
  };

  // rendered after next or previous button is clicked, and when inputting
  useEffect(() => {
    if (
      nameError === false &&
      emailInvalidError === false &&
      emailError === false &&
      passwordInvalidError === false &&
      passwordError === false &&
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
          {nameError ? (
            <p className="error-message">お名前が記入されていません</p>
          ) : (
            <div className="spacing"></div>
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
          <InputSelect
            label="ロケーション"
            placeholder="ロケーションを選択してください"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            options={countries}
          />
          <RadioForm
            label="求める雇用形態"
            options={optionData.userLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
          />
          <div className="buttonContainer">
            <button className="btn-lg btn-fill" type="submit">
              next
            </button>
          </div>
        </>
      );
      break;
    case 1:
      contents = (
        <>
          <InputLabel required>
            プロフィールリンク (LinkedIn / GitHub / Website etc)
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
          {link1Error && <p className="error-message">URLが無効です</p>}
          <InputText
            isRequired={false}
            placeholder="https://github.com/example"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={link2}
            name="link2"
          />
          {link2Error && <p className="error-message">URLが無効です</p>}
          <InputText
            isRequired={false}
            placeholder="https://lraough.com/"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={link3}
            name="link3"
          />
          {link3Error && <p className="error-message">URLが無効です</p>}
          {linkError && (
            <p className="error-message">1つ以上のリンクが記入されていません</p>
          )}
          <InputSelect
            label="英語レベル"
            placeholder="ご自身の英語レベルについて教えてください"
            type="text"
            onChange={(e) => onHandleEnglishLevel(e)}
            value={englishLevel}
            options={levelOfEnglish}
          />
          <RadioForm
            label="ご自身の職種"
            options={optionData.userDescription}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <div className="buttonContainer">
            {firebaseErrorMessage.length !== 0 && (
              <p className="error-message firebase-err-message">
                {firebaseErrorMessage}
              </p>
            )}
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
    <div className="main-apply">
      <BlueSidePart />
      <div className="rightBox">
        <h2 className="title">JOIN AS A GLOBAL DEVELOPER</h2>
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
