import React, { useEffect } from "react";
import BlueSidePart from "../../BlueSidePart/BlueSidePart";
import ThankYou from "./ThankYou";
import { FormLabel, TextField, Button } from "@mui/material";
import validator from "validator";
import "./ContactForm.scss";
import { useState } from "react";
import { functions } from "../../../firebase/firebase";

const DEFAULT_INFO = {
  name: "",
  email: "",
  content: "",
};

const ContactForm = () => {
  const [inquiryInfo, setInquiryInfo] = useState(DEFAULT_INFO);
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(inquiryInfo);

  const isEmptyOrHasWhiteSpace = (input) => {
    if (validator.isEmpty(input) || !input.match(/\S/g)) {
      return true;
    }
  };

  const validateName = (inputName) => {
    if (!isEmptyOrHasWhiteSpace(inputName)) return;
    return "お名前が記入されていません";
  };

  const validateEmail = (inputEmail) => {
    let errorMessages = [];
    validator.trim(inputEmail);
    if (!validator.isEmail(inputEmail)) {
      errorMessages.push("メールアドレスが無効です");
    } else if (isEmptyOrHasWhiteSpace(inputEmail)) {
      errorMessages.push("メールアドレスが記入されていません");
    }
    return errorMessages;
  };

  const validateMessage = (inputMessage) => {};

  const onSubmit = (e) => {
    e.preventDefault();
    const sendMail = functions.httpsCallable("sendMail");
    sendMail(inquiryInfo);
    console.log(inquiryInfo);
    console.log("submitted");
    setInquiryInfo(DEFAULT_INFO);
    setIsSubmitted(true);
  };

  useEffect(() => {
    return;
  }, [isSubmitted]);

  return (
    <div className="main-contact">
      <BlueSidePart />
      {!isSubmitted ? (
        <div className="form-comtainer">
          <h1 className="title">Contact</h1>
          <FormLabel
            htmlFor="name"
            className="label"
            component="legend"
            required
          >
            NAME
          </FormLabel>
          <TextField
            id="name"
            fullWidth
            required
            placeholder="Your Name"
            variant="outlined"
            margin="normal"
            className="text-field"
            size="small"
            type="text"
            onChange={(e) =>
              validator.isLength(e.target.value, 0, 100) &&
              setInquiryInfo({
                ...inquiryInfo,
                name: e.target.value,
              })
            }
            value={inquiryInfo.name}
          />
          <p>お名前が記入されていません</p>
          <FormLabel
            htmlFor="email"
            className="label"
            component="legend"
            required
          >
            EMAIL
          </FormLabel>
          <TextField
            fullWidth
            id="email"
            required
            placeholder="Email Address"
            variant="outlined"
            margin="normal"
            className="text-field"
            size="small"
            type="email"
            onChange={(e) =>
              validator.isLength(e.target.value, 0, 100) &&
              setInquiryInfo({
                ...inquiryInfo,
                email: e.target.value,
              })
            }
            value={inquiryInfo.email}
          />
          <p>メールアドレスが無効です</p>
          <FormLabel
            htmlFor="content"
            className="label"
            component="legend"
            required
          >
            DESCRIPTION
          </FormLabel>
          <TextField
            fullWidth
            id="content"
            required
            placeholder="お問い合わせ内容を記入下さい。"
            variant="outlined"
            margin="normal"
            multiline
            rows={7}
            className="text-field"
            size="small"
            type="text"
            onChange={(e) =>
              validator.isLength(e.target.value, 0, 1000) &&
              setInquiryInfo({
                ...inquiryInfo,
                content: e.target.value,
              })
            }
            value={inquiryInfo.content}
          />
          <p>{inquiryInfo.content.length} / 1000</p>
          <Button
            variant="contained"
            className="submit-btn"
            type="submit"
            onClick={(e) => onSubmit(e)}
          >
            SUBMIT
          </Button>
        </div>
      ) : (
        <ThankYou />
      )}
    </div>
  );
};

export default ContactForm;
