import React, { useEffect } from 'react';
import BlueSidePart from '../../BlueSidePart/BlueSidePart';
import ThankYou from './ThankYou';
import { FormLabel, TextField, Button } from '@mui/material';
import validator from 'validator';
import './ContactForm.scss';
import { useState } from 'react';
import { functions } from '../../../firebase/firebase';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [emailErrors, setEmailErrors] = useState(null);
  const [contentError, setContentError] = useState(null);
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showContentError, setShowContentError] = useState(false);

  const isEmptyOrHasWhiteSpace = (input) => {
    if (validator.isEmpty(input) || !input.match(/\S/g)) {
      return true;
    }
  };

  const validateName = (inputName) => {
    if (!isEmptyOrHasWhiteSpace(inputName)) {
      setNameError('');
      return;
    }
    setNameError('お名前が記入されていません');
    setShowNameError(true);
  };

  const validateEmail = (inputEmail) => {
    let errMsgsArr = [];
    validator.trim(inputEmail);
    if (!validator.isEmail(inputEmail)) {
      errMsgsArr.push('メールアドレスが無効です');
    }
    if (isEmptyOrHasWhiteSpace(inputEmail)) {
      errMsgsArr.push('メールアドレスが記入されていません');
    }
    setEmailErrors(errMsgsArr);
    errMsgsArr.length !== 0 && setShowEmailError(true);
  };

  const validateMessage = (inputMessage) => {
    if (!isEmptyOrHasWhiteSpace(inputMessage)) {
      setContentError('');
      return;
    }
    setContentError('メッセージが記入されていません');
    setShowContentError(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validateName(name);
    validateEmail(email);
    validateMessage(content);
  };

  useEffect(() => {
    if (nameError === null && emailErrors === null && contentError === null)
      return;
    if (nameError === '' && emailErrors.length === 0 && contentError === '')
      setCanSubmit(true);
  }, [nameError, emailErrors, contentError]);

  useEffect(() => {
    if (!canSubmit) return;
    const inquiryInfo = {
      name,
      email,
      content,
    };
    const sendMail = functions.httpsCallable('sendMail');
    sendMail(inquiryInfo);
    console.log('submitted');
  }, [canSubmit, name, email, content]);

  return (
    <div className="main-contact">
      <BlueSidePart />
      {!canSubmit ? (
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
            className={!showNameError ? 'text-field' : null}
            size="small"
            type="text"
            onChange={(e) => {
              setShowNameError(false);
              validator.isLength(e.target.value, 0, 100) &&
                setName(e.target.value);
            }}
            value={name}
          />
          {nameError !== '' && showNameError && (
            <p className="err-msg name-err">{nameError}</p>
          )}
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
            className={!showEmailError ? 'text-field' : null}
            size="small"
            type="email"
            onChange={(e) => {
              setShowEmailError(false);
              validator.isLength(e.target.value, 0, 254) &&
                setEmail(e.target.value);
            }}
            value={email}
          />
          {emailErrors !== null && emailErrors.length !== 0 && showEmailError && (
            <div className="email-err-wrap">
              {emailErrors.map((errMsg, index) => (
                <p className="err-msg email-errs" key={index}>
                  {errMsg}
                </p>
              ))}
            </div>
          )}
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
            className={!showContentError ? 'text-field-content' : null}
            size="small"
            type="text"
            onChange={(e) => {
              setShowContentError(false);
              validator.isLength(e.target.value, 0, 1000) &&
                setContent(e.target.value);
            }}
            value={content}
          />
          <div
            className={!showContentError ? 'content-wrap' : 'content-wrap-err'}
          >
            {contentError !== '' && showContentError && (
              <p className="err-msg content-err">{contentError}</p>
            )}
            <p className={content.length > 950 ? 'color-red' : null}>
              {content.length} / 1000
            </p>
          </div>
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
