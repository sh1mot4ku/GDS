
import React from "react";
import {
  FormControl,
  Grid,
  Button,
} from "@material-ui/core";
import InputText from "./InputText.jsx";
import "./Apply.scss";
import RadioForm from "./RadioForm.jsx";

function Apply() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
          <h2>JOIN AS A GLOBAL DEVELOPER</h2>

          <FormControl component="fieldset">
            <InputText
              label={"FULL NAME"}
              placeholder={"YOUR NAME"}
              type={"text"}
            />
            <InputText
              label={"EMAIL"}
              placeholder={"Email Address"}
              type={"email"}
            />
            <InputText
              label={"PASSWORD"}
              placeholder={"Password"}
              type={"password"}
            />
            <InputText
              label={"LOCATION"}
              placeholder={"Location"}
              type={"text"}
            />
            <RadioForm
              value={value}
              handleChange={handleChange}
              label={"LOOKING FOR"}
              options={optionData.userLookingFor}
            />
            <div className="buttonContainer">
              <Button color="primary" variant="contained" className="button">
                next
              </Button>
            </div>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default Apply;
