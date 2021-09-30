import React, { useState } from "react";
import {
  Grid,
  Button,
} from "@material-ui/core";
import InputText from "./InputText.jsx";
import "./Apply.scss";
import RadioForm from "./RadioForm.jsx";
// import database from "../firebase/firebase"
import { v4 as uuidv4 } from 'uuid';
import {insertUser} from '../API/dbutils';

function Apply() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  // const uuid = uuidv4();

  // .ref(`/${uuid}`)
  const USER_TYPE_CLIENT = "client";

  const onSubmit = e => {
    e.preventDefault();
    const postingInfo = {
      fullName,
      email,
      password,
      location,
      lookingFor,
      userType: USER_TYPE_CLIENT,
    }
    insertUser(postingInfo)
    // database.ref(`/user/${uuid}`).set(postingInfo).then(() => {
    //   console.log(postingInfo);
    // })
  }

  const optionData = {
    userLookingFor: ["FULL-TIME EMPLOYMENT", "CONTRACT / FREELANCE JOBS", "BOTH PERMANENT AND CONTRACT"],
    userDescription: ["SOFTWARE ENGINEER / ソフトウェアエンジニア", "PRODUCT DESIGNER / プロダクトデザイナー", "PRODUCT MANAGER / プロダクトマネージャー", "GROWTH HACKER / グロースハッカー", "BUSINESS OPS / ビジネスオペレーションズ"],
    businessLookingFor: ["HIRING DEVELOPERS / エンジニア", "HIRING DESIGNERS / デザイナー", "HIRING BUSINESS OPS / ビジネスサイド"],
    businessCommitment: ["FULL TIME (40 or more hrs/week) / 正社員", "PART TIME (Less than 40hrs/week) / フリーランサー", "I'LL DECIDE LATER / まだ決めていない"]

  }

  return (
    <>
      <Grid container direction="row" className="main">
        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="leftBox"
        >
          <img alt="" src="/image/logo-white 1.png" className="logo" />
          <img alt="" src="/image/remoteStack.png" className="remoteStack" />
        </Grid>
        <Grid
          item
          xs={8}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="rightBox"
        >
          <h2 className="title">HIRE THE GLOBAL DEV TEAMS</h2>

          <form component="fieldset" onSubmit={onSubmit}>
            <InputText
              label={"FULL NAME"}
              placeholder={"YOUR NAME"}
              type={"text"}
              onChange={e => setFullName(e.target.value)}
            />
            <InputText
              label={"EMAIL"}
              placeholder={"Email Address"}
              type={"email"}
              onChange={e => setEmail(e.target.value)}
            />
            <InputText
              label={"PASSWORD"}
              placeholder={"Password"}
              type={"password"}
              onChange={e => setPassword(e.target.value)}
            />
            <InputText
              label={"LOCATION"}
              placeholder={"Location"}
              type={"text"}
              onChange={e => setLocation(e.target.value)}
            />
            <RadioForm
              label={"LOOKING FOR"}
              options={optionData.userLookingFor}
              onChange={e => setLookingFor(e.target.value)}
            />
            <div className="buttonContainer">
              <Button color="primary" variant="contained" className="button" type="submit">
                next
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default Apply;
