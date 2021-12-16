import React, { useState, useEffect } from "react";
import InputTextAreaAndLabel from "../ui/InputTextAreaAndLabel";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import RadioForm from "../ui/RadioForm";
import { optionData } from "../../data/applyingInfo/recruiter";
import validator from "validator";

const ProfileEditRecruiter = ({
  companyAddress: originalCompanyAddress,
  lookingFor: originalLookingFor,
  commitment: originalcommitment,
  mustHave: originalmustHave,
  niceToHave: originalniceToHave,
  projectDetail: originalprojectDetail,
  setLastHalfForm,
}) => {
  const [companyAddress, setCompanyAddress] = useState(
    originalCompanyAddress || ""
  );
  const [lookingFor, setLookingFor] = useState(originalLookingFor || "");
  const [commitment, setCommitment] = useState(originalcommitment || "");
  const [mustHave, setMustHave] = useState(originalmustHave || "");
  const [niceToHave, setNiceToHave] = useState(originalniceToHave || "");
  const [projectDetail, setProjectDetail] = useState(
    originalprojectDetail || ""
  );
  const [companyAddressError, setCompanyAddressError] = useState(null);
  const [mustHaveError, setMustHaveError] = useState(null);
  const [niceToHaveError, setNiceToHaveError] = useState(null);
  const [projectDetailError, setProjectDetailError] = useState(null);

  useEffect(() => {
    setLastHalfForm({
      companyAddress,
      lookingFor,
      commitment,
      mustHave,
      niceToHave,
      projectDetail,
    });
  }, [
    companyAddress,
    lookingFor,
    commitment,
    mustHave,
    niceToHave,
    projectDetail,
  ]);

  const onHandleInputs = (e) => {
    switch (e.target.name) {
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
        console.log("unexpected error occured");
    }
  };

  return (
    <React.Fragment>
      <div className="edit-container">
        <InputTextAndLabel
          label="会社所在地"
          placeholder="会社所在地を記入してください"
          type="text"
          onChange={(e) => onHandleInputs(e)}
          value={companyAddress}
          name="company-address"
        />
        {companyAddressError && (
          <p className="error-message">会社所在地をご記入ください</p>
        )}
      </div>
      <div className="edit-container">
        <RadioForm
          label="募集職種"
          options={optionData.businessLookingFor}
          onChange={(e) => setLookingFor(e.target.value)}
          value={lookingFor}
        />
      </div>
      <div className="edit-container">
        <RadioForm
          label="コミット時間"
          options={optionData.businessCommitment}
          onChange={(e) => setCommitment(e.target.value)}
          value={commitment}
        />
      </div>
      <div className="edit-container">
        <InputTextAndLabel
          label="必須条件・スキル"
          placeholder="必須条件・スキルを記入ください"
          type="text"
          onChange={(e) => onHandleInputs(e)}
          value={mustHave}
          name="must-have"
        />
        {mustHaveError && (
          <p className="error-message">必須条件・スキルが記入されていません</p>
        )}
      </div>
      <div className="edit-container">
        <InputTextAndLabel
          label="歓迎するスキル"
          placeholder="歓迎するスキルを記入ください"
          type="text"
          onChange={(e) => onHandleInputs(e)}
          value={niceToHave}
          name="niceTo-have"
        />
        {niceToHaveError && (
          <p className="error-message">歓迎するスキルが記入されていません</p>
        )}
      </div>
      <div className="edit-container">
        <InputTextAreaAndLabel
          label="募集内容"
          placeholder="簡単なプロジェクト概要について記入下さい。後ほどインタビューにて詳細を伺います。"
          type="text"
          onChange={(e) => onHandleInputs(e)}
          value={projectDetail}
          name="project-detail"
        />
        {projectDetailError && (
          <p className="error-message">募集内容が記入されていません</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProfileEditRecruiter;
