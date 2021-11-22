import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import InputTextAndLabel from '../Apply/InputTextAndLabel';
import { auth } from '../../firebase/firebase';
import { insertUser } from '../../API/dbutils';
import BlueSidePart from '../BlueSidePart/BlueSidePart';
import './Login.scss';
// const info = {};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const postingInfo = {
      profile: {
        email,
        password,
      },
    };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // setUser(postingInfo);
        insertUser(postingInfo, userCredential.user.uid);
      })
      .catch((e) => {
        console.error(`Error happened: ${e}`);
      });
  };

  return (
    <div className="main-login">
      <BlueSidePart />
      <div className="rightBox">
        <h2 className="title">Login</h2>
        <form onSubmit={onSubmit} className="form">
          <InputTextAndLabel
            label="EMAIL"
            placeholder="YOUR EMAIL"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputTextAndLabel
            label="PASSWORD"
            placeholder="YOUR PASSWORD"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="login-buttons">
            <Button
              variant="contained"
              color="primary"
              className="round-button"
            >
              Login
            </Button>
            <button variant="contained" color="primary" className="sub-button">
              新規登録はこちら
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
