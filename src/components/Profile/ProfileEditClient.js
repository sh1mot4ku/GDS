import React, { useState, useEffect } from "react";
import InputText from "../ui/InputText";
import InputLabel from "@mui/material/InputLabel";
import InputSelect from "../ui/InputSelect";
import RadioForm from "../ui/RadioForm";
import {
  optionData,
  countries,
  levelOfEnglish,
} from "../../data/applyingInfo/client";
import validator from "validator";
import "./ProfileEditClient.scss";

const ProfileEditClient = ({
  location: originalLocation,
  lookingFor: originalLookingFor,
  links: originalLinks,
  englishLevel: originalEnglishLevel,
  description: originalDescription,
  setLastHalfForm,
}) => {
  const [location, setLocation] = useState(originalLocation || "Japan");
  const [lookingFor, setLookingFor] = useState(originalLookingFor || "");
  const [link1, setLink1] = useState(originalLinks?.link1 || "");
  const [link2, setLink2] = useState(originalLinks?.link2 || "");
  const [link3, setLink3] = useState(originalLinks?.link3 || "");
  const [englishLevel, setEnglishLevel] = useState(originalEnglishLevel || "");
  const [description, setDescription] = useState(originalDescription || "");
  const [linkError, setLinkError] = useState(null);
  const [link1Error, setLink1Error] = useState(null);
  const [link2Error, setLink2Error] = useState(false);
  const [link3Error, setLink3Error] = useState(false);

  useEffect(() => {
    // send input information to parent component
    setLastHalfForm({
      location,
      lookingFor,
      links: { link1, link2, link3 },
      englishLevel,
      description,
    });
  }, [location, lookingFor, link1, link2, link3, englishLevel, description]);

  const onHandleInputs = (e) => {
    switch (e.target.name) {
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

  return (
    <React.Fragment>
      <div className="edit-container">
        <InputSelect
          label="ロケーション"
          placeholder="ロケーションを選択してください"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          options={countries}
        />
      </div>
      <div className="edit-container" id="looking-for">
        <RadioForm
          label="求める雇用形態"
          options={optionData.userLookingFor}
          onChange={(e) => setLookingFor(e.target.value)}
          value={lookingFor}
        />
      </div>
      <div className="edit-container">
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
      </div>
      <div className="edit-container">
        <InputSelect
          label="英語レベル"
          placeholder="ご自身の英語レベルについて教えてください"
          type="text"
          onChange={(e) => setEnglishLevel(e.target.value)}
          value={englishLevel}
          options={levelOfEnglish}
        />
      </div>
      <div className="edit-container">
        <RadioForm
          label="ご自身の職種"
          options={optionData.userDescription}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
    </React.Fragment>
  );
};

export default ProfileEditClient;
