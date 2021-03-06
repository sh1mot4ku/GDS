import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../ui/Button.scss";
import InputTextAreaAndLabel from "../ui/InputTextAreaAndLabel";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import RadioForm from "../ui/RadioForm";
import { auth, functions } from "../../firebase/firebase";
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
        console.error("unexpected error occured");
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
          console.error("unexpected error occured");
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
          console.error("unexpected error occured");
      }
    }
  };
  /* -------------------------------------------------------------------------- */

  // fired when register button is pressed
  const onSubmit = (e) => {
    e.preventDefault();
    validateAndTailorInput(mustHave, "must-have");
    validateAndTailorInput(niceToHave, "niceTo-have");
    validateAndTailorInput(projectDetail, "project-detail");
    setIsTyping(false);
    setIsRegistering(false);
  };

  // rendered after register button is pressed, and when inputting
  useEffect(() => {
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
            pl: password.length,
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
        setIsSubmitted(true);

        // Send email for verificate user's email address
        await auth.currentUser.sendEmailVerification({
          url: `${window.location.origin}/thank-you`,
        });

        // Send email to GDS
        const sendSignUpNotification_Recruiter = functions.httpsCallable(
          "sendSignUpNotification_Recruiter"
        );
        await sendSignUpNotification_Recruiter(postingInfo);

        history.push({
          pathname: "/send-mail-confirm",
          state: { email },
        });
      } catch (error) {
        console.error(`Error happened: ${error}`);
        switch (error.code) {
          case "auth/invalid-email":
            setFirebaseErrorMessage("????????????????????????????????????");
            break;
          case "auth/email-already-in-use":
            setFirebaseErrorMessage(
              "??????????????????????????????????????????????????????????????????????????????"
            );
            break;
          case "auth/operation-not-allowed":
            setFirebaseErrorMessage(
              "???????????????????????????????????????????????????????????????????????????"
            );
            break;
          case "auth/weak-password":
            setFirebaseErrorMessage(
              "??????????????????7???????????????????????????????????????????????????????????????????????????"
            );
            break;
          default:
            setFirebaseErrorMessage(
              "?????????????????????????????????????????????????????????????????????????????????"
            );
        }
        setIsClientValidationPassed(false);
        setIsRegistering(true);
      }
    }
  };

  // fired when the next or previous button is clicked
  const handleClick = (e, newStep, userInfo) => {
    e.preventDefault();
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
            label="?????????"
            placeholder="???)?????? ??????"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={fullName}
            name="fullname"
          />
          {nameError && (
            <p className="error-message">???????????????????????????????????????</p>
          )}
          <InputTextAndLabel
            label="?????????????????????"
            placeholder="example@example.com"
            type="email"
            onChange={(e) => onHandleInputs(e)}
            value={email}
            name="email"
          />
          {emailError && (
            <p className="error-message">???????????????????????????????????????????????????</p>
          )}
          {emailInvalidError && (
            <p className="error-message">????????????????????????????????????</p>
          )}
          <InputTextAndLabel
            label="???????????????"
            placeholder="7??????????????????????????????"
            type="password"
            onChange={(e) => onHandleInputs(e)}
            value={password}
            name="password"
          />
          {passwordInvalidError && (
            <p className="error-message">
              7???????????????????????????????????????????????????????????????????????????
            </p>
          )}
          {passwordError && (
            <p className="error-message">??????????????????????????????????????????</p>
          )}
          <InputTextAndLabel
            label="???????????????"
            placeholder="??????????????????????????????????????????"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={companyAddress}
            name="company-address"
          />
          {companyAddressError && (
            <p className="error-message">???????????????????????????????????????</p>
          )}
          <RadioForm
            label="????????????"
            options={optionData.businessLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
          />
          <RadioForm
            label="??????????????????"
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
            label="????????????????????????"
            placeholder="?????????????????????????????????????????????"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={mustHave}
            name="must-have"
          />
          {mustHaveError && (
            <p className="error-message">
              ??????????????????????????????????????????????????????
            </p>
          )}
          <InputTextAndLabel
            label="?????????????????????"
            placeholder="??????????????????????????????????????????"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={niceToHave}
            name="niceTo-have"
          />
          {niceToHaveError && (
            <p className="error-message">???????????????????????????????????????????????????</p>
          )}
          <InputTextAreaAndLabel
            label="????????????"
            placeholder="????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={projectDetail}
            name="project-detail"
          />
          {projectDetailError && (
            <p className="error-message">??????????????????????????????????????????</p>
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
              ??? PREVIOUS
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
                  ? "?????????????????????????????????????????????????????????????????????"
                  : step === 1
                  ? "?????????????????????????????????????????????????????????????????????????????????"
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
