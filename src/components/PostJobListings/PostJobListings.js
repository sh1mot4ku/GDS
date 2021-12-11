import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import database, { firebase, storage } from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import TrimModal from "../ui/TrimModal";
import { v4 as uuid } from "uuid";
import ChipInputAutosuggest from "../ui/SkillInput";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import skillsSuggestion from "../../data/skills/integration";
import moment from "moment";
import {
  addUsersJobListings,
  editUsersJobListings,
} from "../../action/usersJobListings";
import "./PostJobListings.scss";

const MIN_ROWS_LARGE_INPUT = 6;
const MAX_ROWS_LARGE_INPUT = 12;
let jobId = ""; // unique posting ID
const DEFAULT_PHOTO = "/photos/img-empty.jpg";

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

const PostJobListings = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [photoBlob, setPhotoBlob] = useState(null);
  const [originPhotoSrc, setOriginPhotoSrc] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(props.photoUrl || DEFAULT_PHOTO);
  const [companyName, setCompanyName] = useState(props.companyName || "");
  const [companyAddress, setCompanyAddress] = useState(
    props.companyAddress || ""
  );
  const [jobTitle, setJobTitle] = useState(props.jobTitle || "");
  const [tags, setTags] = useState(props.tags || []);
  const [jobListing, setJobListing] = useState(props.jobListing || "");
  const [jobDescription, setJobDescription] = useState(
    props.jobDescription || ""
  );
  const [must, setMust] = useState(props.must || "");
  const [welcome, setWelcome] = useState(props.welcome || "");
  const [employeeLocation, setEmployeeLocation] = useState(
    props.employeeLocation || ""
  );
  const [employmentType, setEmploymentType] = useState(
    props.employmentType || ""
  );
  const [annualSalaly, setAnnualSalaly] = useState(props.annualSalaly || "");
  const [workingHours, setWorkingHours] = useState(props.workingHours || "");
  const [leaves, setLeaves] = useState(props.leaves || "");
  const [skillTagsError, setSkillTagsError] = useState(false);
  const { uid } = useSelector((state) => state.user); // user's auth ID

  useEffect(() => {
    if (!props.id) {
      jobId = uuid(); // set posting ID just once after component loaded
    } else {
      jobId = props.id; // assign previous job ID when user edit job listing
    }
  }, [props.id]);

  useEffect(() => {
    if (photoBlob) {
      const uploadTask = storage.ref(`photos/${uid}/${jobId}`).put(photoBlob);
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
    storage
      .ref(`photos/${uid}/${jobId}`)
      .getDownloadURL()
      .then((url) => {
        setPhotoUrl(url);
      });
  };

  const onPhotoChange = async (e) => {
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
    if (
      companyName &&
      companyAddress &&
      jobTitle &&
      tags.length !== 0 &&
      jobListing &&
      jobDescription &&
      must &&
      welcome &&
      leaves &&
      employeeLocation &&
      employmentType &&
      annualSalaly &&
      workingHours
    ) {
      const postedTimeStamp = moment().utc().valueOf();
      const postingInfo = {
        photoUrl,
        companyName,
        companyAddress,
        jobTitle,
        tags,
        jobListing,
        jobDescription,
        must,
        welcome,
        leaves,
        employeeLocation,
        employmentType,
        annualSalaly,
        workingHours,
        postedTimeStamp,
        id: jobId,
      };
      database
        .ref(`/jobListings/${uid}/${jobId}`)
        .set(postingInfo)
        .then(() => {
          if (!props.edit) {
            dispatch(addUsersJobListings(postingInfo));
            console.log("Posted successfully!");
          } else {
            dispatch(editUsersJobListings(postingInfo));
            console.log("Editted Successfully!");
          }
          history.push("/joblistings_management");
        });
    } else {
      if (tags.length === 0) setSkillTagsError(true);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-header">{!props.edit ? "求人投稿" : "求人編集"}</h2>
        <form onSubmit={onSubmit} className="joblist-form">
          <div className="input-block">
            <div className="photo-buttons">
              <label>
                {photoUrl === DEFAULT_PHOTO ? (
                  <div className="button--photo">
                    <CameraAltIcon />
                    <div>画像を選択してください</div>
                  </div>
                ) : (
                  <div className="profile-photo-wrapper">
                    <img
                      src={photoUrl}
                      alt="profile"
                      className="profile-photo"
                    />
                    <CancelIcon
                      className="profile-photo-delete-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPhotoUrl(DEFAULT_PHOTO);
                      }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={onPhotoChange}
                  className="change-photo"
                  accept="image/*"
                ></input>
              </label>
            </div>
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="会社名"
              placeholder="会社名を記入してください"
              inputProps={{ maxLength: 100 }}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="会社所在地"
              placeholder="会社所在地を記入してください"
              inputProps={{ maxLength: 100 }}
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="募集職種"
              placeholder="募集職種を記入してください"
              inputProps={{ maxLength: 50 }}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
              error={skillTagsError}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="求人内容"
              placeholder="求人内容を記入してください"
              inputProps={{ maxLength: 750 }}
              value={jobListing}
              onChange={(e) => setJobListing(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="業務内容"
              placeholder="業務内容を記入してください"
              inputProps={{ maxLength: 750 }}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="必須条件・スキル"
              placeholder="必須条件・スキルを記入してください"
              inputProps={{ maxLength: 500 }}
              value={must}
              onChange={(e) => setMust(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="歓迎するスキル・経験"
              placeholder="歓迎するスキル・経験を記入してください"
              inputProps={{ maxLength: 500 }}
              value={welcome}
              onChange={(e) => setWelcome(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="勤務地"
              placeholder="勤務地詳細を記入してください"
              inputProps={{ maxLength: 100 }}
              value={employeeLocation}
              onChange={(e) => setEmployeeLocation(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="雇用形態"
              placeholder="雇用形態を記入してください"
              inputProps={{ maxLength: 100 }}
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="想定年収"
              placeholder="想定年収を記入してください"
              inputProps={{ maxLength: 100 }}
              value={annualSalaly}
              onChange={(e) => setAnnualSalaly(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="勤務時間"
              placeholder="勤務時間を記入してください"
              inputProps={{ maxLength: 200 }}
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="休日・休暇"
              placeholder="休日・休暇を記入してください"
              inputProps={{ maxLength: 200 }}
              value={leaves}
              onChange={(e) => setLeaves(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="save-button-wrapper">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="save-button"
            >
              保存する
            </Button>
          </div>
          <div className="cancel-wrapper">
            <span
              className="cancel"
              onClick={() => history.push("/joblistings_management")}
            >
              キャンセル
            </span>
          </div>
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
