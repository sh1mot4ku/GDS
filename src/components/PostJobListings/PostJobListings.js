import React, { useState, useEffect } from "react";
import "../ui/Button.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { firebase, storage } from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import TrimModal from "../ui/TrimModal";
import { v4 as uuid } from "uuid";
import ChipInputAutosuggest from "../ui/SkillInput";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import skillsSuggestion from "../../data/skills/integration";
import moment from "moment";
import {
  startAddUsersJobListings,
  startEditUsersJobListings,
} from "../../action/usersJobListings";
import { readFile } from "../../readImage/cropImage";
import employmentTypeOptions from "../../data/radioButtonOptions/PostJobListings";
import RadioForm from "../ui/RadioForm";
import "./PostJobListings.scss";

const MIN_ROWS_LARGE_INPUT = 6;
const MAX_ROWS_LARGE_INPUT = 12;
let jobId = ""; // unique posting ID
const DEFAULT_PHOTO = "/photos/img-empty.jpg";
const SHORT_JOB_LISTINGS_LENGTH = 100; // the length of short job listings
const SHORT_EMPLOYEE_LOCATION_LENGTH = 50; // the length of short employee location

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
  const [storageRef, setStorageRef] = useState("");

  useEffect(() => {
    if (!props.id) {
      jobId = uuid(); // set posting ID just once after component loaded
    } else {
      jobId = props.id; // assign previous job ID when user edit job listing, and copy ID when user copy it
    }
  }, [props.id]);

  useEffect(() => {
    if (uid && jobId) {
      setStorageRef(storage.ref(`photos/jobListings/${uid}/${jobId}`));
    }
  }, [uid, jobId]);

  useEffect(() => {
    if (photoBlob) {
      const uploadTask = storageRef.put(photoBlob);
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
    console.error(`Error occured : ${error}`);
  };

  const complete = () => {
    storageRef.getDownloadURL().then((url) => {
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

  const onSubmit = async (e) => {
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
      const shortJobListing = jobListing.slice(0, SHORT_JOB_LISTINGS_LENGTH);
      const shortEmployeeLocation = employeeLocation.slice(
        0,
        SHORT_EMPLOYEE_LOCATION_LENGTH
      );

      // small posting information to show user
      const shortPostingInfo = {
        photoUrl,
        companyName,
        jobTitle,
        jobListing: shortJobListing, // shorten length of job listing
        tags,
        employmentType,
        postedTimeStamp,
        employeeLocation: shortEmployeeLocation, // shorten length of employee location
      };

      const fullPostingInfo = {
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
      };

      if (!props.edit) {
        // when adding job posting
        await dispatch(
          startAddUsersJobListings(jobId, shortPostingInfo, fullPostingInfo)
        ); // should write it with async/await here?
      } else {
        // when editing job posting
        await dispatch(
          startEditUsersJobListings(jobId, shortPostingInfo, fullPostingInfo)
        );
      }
      history.push("/joblistings_management");
    } else {
      if (tags.length === 0) setSkillTagsError(true);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-header">
          {props.edit ? "????????????" : props.copy ? "????????????" : "????????????"}
        </h2>
        <form onSubmit={onSubmit} className="joblist-form">
          <div className="input-block">
            <div className="photo-buttons">
              <label>
                {photoUrl === DEFAULT_PHOTO ? (
                  <div className="button--photo">
                    <CameraAltIcon />
                    <div>?????????????????????????????????</div>
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
              label="?????????"
              placeholder="????????????????????????????????????"
              inputProps={{ maxLength: 100 }}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="???????????????"
              placeholder="??????????????????????????????????????????"
              inputProps={{ maxLength: 100 }}
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="????????????"
              placeholder="???????????????????????????????????????"
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
              label="???????????????"
              placeholder="??????????????????????????????????????????"
              error={skillTagsError}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="????????????"
              placeholder="???????????????????????????????????????"
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
              label="????????????"
              placeholder="???????????????????????????????????????"
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
              label="????????????????????????"
              placeholder="???????????????????????????????????????????????????"
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
              label="??????????????????????????????"
              placeholder="?????????????????????????????????????????????????????????"
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
              label="?????????"
              placeholder="??????????????????????????????????????????"
              inputProps={{ maxLength: 100 }}
              value={employeeLocation}
              onChange={(e) => setEmployeeLocation(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="input-block input-block--radio">
            <RadioForm
              label="????????????"
              options={employmentTypeOptions}
              onChange={(e) => setEmploymentType(e.target.value)}
              value={employmentType}
            />
          </div>
          <div className="input-block">
            <InputTextAndLabel
              label="????????????"
              placeholder="???????????????????????????????????????"
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
              label="????????????"
              placeholder="???????????????????????????????????????"
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
              label="???????????????"
              placeholder="??????????????????????????????????????????"
              inputProps={{ maxLength: 200 }}
              value={leaves}
              onChange={(e) => setLeaves(e.target.value)}
              multiline
              minRows={MIN_ROWS_LARGE_INPUT}
              maxRows={MAX_ROWS_LARGE_INPUT}
            />
          </div>
          <div className="save-button-wrapper">
            <button type="submit" className="btn-lg btn-fill">
              ????????????
            </button>
          </div>
          <div className="cancel-wrapper">
            <span
              className="cancel"
              onClick={() => history.push("/joblistings_management")}
            >
              ???????????????
            </span>
          </div>
        </form>
        {originPhotoSrc && (
          <TrimModal
            originPhotoSrc={originPhotoSrc}
            setPhotoBlob={setPhotoBlob}
            onClose={onClose}
            aspect={5 / 2}
          />
        )}
      </div>
    </div>
  );
};

export default PostJobListings;
