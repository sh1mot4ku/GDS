import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import database, { firebase, storage } from "../../firebase/firebase";
import TrimModal from "./TrimModal";
import { v4 as uuid } from "uuid";
import ChipInputAutosuggest from "./SkillInput";
import skillsSuggestion from "../../data/skills/integration";
import "./PostJobListings.scss";

const MIN_ROWS_LARGE_INPUT = 6;
const MAX_ROWS_LARGE_INPUT = 12;

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

const PostJobListings = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  // const [workPlacePolicy, setWorkPlacePolicy] = useState("");
  const [employeeLocation, setEmployeeLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [jobListing, setJobListing] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [annualSalaly, setAnnualSalaly] = useState("");
  const [must, setMust] = useState("");
  const [welcome, setWelcome] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [leaves, setLeaves] = useState("");
  const [tags, setTags] = useState([]);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [originPhotoSrc, setOriginPhotoSrc] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const postId = uuid();
  // const [photoUrl, setPhotoUrl] = useState(props.profile.photoUrl || defaultPhoto);

  // いつ掲載されたかの情報も登録する

  useEffect(() => {
    if (photoBlob) {
      const uid = uuid(); // Set posting ID with uuid
      const uploadTask = storage.ref(`photos/${uid}`).put(photoBlob); // photos/uid/postId/ とする
      const unsubscribe = uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        null,
        error,
        complete
      );
      return () => {
        unsubscribe();
      };
    }
  }, [photoBlob]);

  const error = (error) => {
    console.log(`Error occured : ${error}`);
  };

  const complete = () => {
    // storage.ref("photos").child(props.id).getDownloadURL().then((url) => {
    storage
      .ref("photos")
      .child("kari")
      .getDownloadURL()
      .then((url) => {
        setPhotoUrl(url);
      });
  };

  const onPhotoChange = async (e) => {
    // 同じ画像を選んだ時も動くようにしておく
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const photoDataUrl = await readFile(file);
      setOriginPhotoSrc(photoDataUrl);
      e.target.value = "";
    }
  };

  const onClose = () => {
    setOriginPhotoSrc(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const skills = tags.map((tag) => tag.text); // need to change here?
    console.log(skills);
    const postingInfo = {
      photoUrl,
      jobTitle,
      companyName,
      // workPlacePolicy,
      employeeLocation,
      employmentType,
      jobListing,
      jobDescription,
      annualSalaly,
      skills,
      must,
      welcome,
      workingHours,
      leaves,
    };
    database
      .ref(`/jobListings`)
      .push(postingInfo)
      .then(() => {
        console.log("Posted!");
      });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={onSubmit} className="joblist-form">
          <div className="input-block">
            <img src={photoUrl} alt="profile" className="profile-photo"></img>
            <div className="photo-buttons">
              <label>
                <div variant="contained" className="button--photo">
                  背景画像の設定
                </div>
                <input
                  type="file"
                  onChange={onPhotoChange}
                  className="change-photo"
                  accept="image/*"
                ></input>
              </label>
              <div
                variant="contained"
                className="button--photo"
                onClick={() => setPhotoUrl("")}
              >
                画像を削除
              </div>
            </div>
          </div>
          <div className="input-block">
            <TextField
              label="会社名"
              id="outlined-basic"
              placeholder="会社名を記入してください"
              inputProps={{ maxLength: 50 }}
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="会社所在地"
              id="outlined-basic"
              placeholder="会社所在地を記入してください"
              inputProps={{ maxLength: 100 }}
              variant="outlined"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="募集職種"
              id="outlined-basic"
              placeholder="募集職種を記入してください"
              variant="outlined"
              inputProps={{ maxLength: 50 }}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <ChipInputAutosuggest
              data={skillsSuggestion}
              tags={tags}
              setTags={setTags}
              maxSuggestions={15}
              maxTags={10}
              maxInputLength={30}
              label="スキルタグ"
              placeholder="スキルタグを記入してください"
            />
          </div>
          <div className="input-block">
            <TextField
              label="求人内容"
              id="outlined-multiline-static"
              placeholder="求人内容を記入してください"
              variant="outlined"
              inputProps={{ maxLength: 1000 }}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              value={jobListing}
              onChange={(e) => setJobListing(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="業務内容"
              id="outlined-multiline-static"
              placeholder="業務内容を記入してください"
              inputProps={{ maxLength: 1000 }}
              variant="outlined"
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="必須条件・スキル"
              id="outlined-basic"
              placeholder="必須条件・スキルを記入してください"
              variant="outlined"
              inputProps={{ maxLength: 500 }}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              value={must}
              onChange={(e) => setMust(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="歓迎するスキル・経験"
              id="outlined-basic"
              placeholder="歓迎するスキル・経験を記入してください"
              variant="outlined"
              inputProps={{ maxLength: 500 }}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              value={welcome}
              onChange={(e) => setWelcome(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="勤務地"
              id="outlined-basic"
              placeholder="勤務地詳細を記入してください"
              inputProps={{ maxLength: 100 }}
              variant="outlined"
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              value={employeeLocation}
              onChange={(e) => setEmployeeLocation(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="雇用形態"
              id="outlined-basic"
              placeholder="雇用形態を記入してください"
              inputProps={{ maxLength: 100 }}
              variant="outlined"
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="想定年収"
              id="outlined-basic"
              placeholder="想定年収を記入してください"
              variant="outlined"
              inputProps={{ maxLength: 100 }}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              value={annualSalaly}
              onChange={(e) => setAnnualSalaly(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="勤務時間"
              id="outlined-basic"
              placeholder="勤務時間を記入してください"
              variant="outlined"
              inputProps={{ maxLength: 200 }}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="休日・休暇"
              id="outlined-basic"
              placeholder="休日・休暇を記入してください"
              variant="outlined"
              inputProps={{ maxLength: 200 }}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
              onChange={(e) => setLeaves(e.target.value)}
              className="text-field"
              required
            />
          </div>
          {/* { errorMsg ? (
            <div className="error-message">{errorMsg}</div>
          ) : (

          )} */}
          <Button variant="contained" color="primary" type="submit">
            投稿
          </Button>
        </form>
        {originPhotoSrc && (
          <TrimModal
            originPhotoSrc={originPhotoSrc}
            setPhotoBlob={setPhotoBlob}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default PostJobListings;
