import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import InputText from "../ui/InputText";
import InputSelect from "../ui/InputSelect";
import RadioForm from "../ui/RadioForm";
import { useSelector, useDispatch } from "react-redux";
import {
  optionData,
  countries,
  levelOfEnglish,
} from "../../data/applyingInfo/client";
import TrimModal from "../ui/TrimModal";
import { readFile } from "../../readImage/cropImage";
import database, { firebase, storage, auth } from "../../firebase/firebase";
import { editUserInfo } from "../../action/user";
import "./ProfileEdit.scss";

const DEFAULT_PHOTO = "/image/icon-user.png";
const USER_TYPE = "client";

const ProfileEdit = () => {
  const history = useHistory();
  const { uid, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [photoBlob, setPhotoBlob] = useState(null);
  const [originPhotoSrc, setOriginPhotoSrc] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(
    userInfo.profile.photoUrl || DEFAULT_PHOTO
  );
  const [fullName, setFullName] = useState(userInfo.profile.fullName || "");
  const [email, setEmail] = useState(userInfo.profile.email || "");
  const [password, setPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [location, setLocation] = useState(
    userInfo.profile.location || "Japan"
  );
  const [lookingFor, setLookingFor] = useState(
    userInfo.profile.lookingFor || ""
  );
  const [link1, setLink1] = useState(userInfo.profile.links.link1 || "");
  const [link2, setLink2] = useState(userInfo.profile.links.link2 || "");
  const [link3, setLink3] = useState(userInfo.profile.links.link3 || "");
  const [englishLevel, setEnglishLevel] = useState(
    userInfo.profile.englishLevel || ""
  );
  const [description, setDescription] = useState(
    userInfo.profile.description || ""
  );
  const [storageRef, setStorageRef] = useState("");

  useEffect(() => {
    if (uid) {
      setStorageRef(storage.ref(`photos/user/${uid}/`));
    }
  }, [uid]);

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
    console.log(`Error occured : ${error}`);
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
    // reauthenticate with Firebase Auth
    const user = auth.currentUser;
    const isEmailSame = user.email === email;
    const isPasswordSame = password === changedPassword;
    if (!isEmailSame || !isPasswordSame) {
      // If user wants to change email or password
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password
        );
        await user.reauthenticateWithCredential(credential);
        if (!isPasswordSame) await user.updatePassword(changedPassword);
        if (!isEmailSame) await user.updateEmail(email);
      } catch (e) {
        console.error(e);
        return; // set Error message here
      }
    }
    const postingInfo = {
      profile: {
        fullName,
        email,
        location,
        lookingFor,
        links: { link1, link2, link3 },
        englishLevel,
        description,
        pl: changedPassword.length,
        photoUrl,
      },
      userType: USER_TYPE,
    };
    database
      .ref(`/user/${uid}`)
      .set(postingInfo)
      .then(() => {
        dispatch(editUserInfo(postingInfo));
        console.log("Editted Successfully!");
        history.push("/profile");
      });
  };

  return (
    <div className="main-edit">
      <form onSubmit={onSubmit}>
        <div className="pf-container">
          <img alt="user-icon" src={photoUrl} className="user-icon" />
          <div>
            <div className="pf-name">{fullName}</div>
            <div className="pf-country">{location}</div>
            <div className="pf-photo-buttons">
              {photoUrl !== DEFAULT_PHOTO && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setPhotoUrl(DEFAULT_PHOTO);
                  }}
                  className="pf-photo-delete-button pf-photo-buttons"
                >
                  <span>削除</span>
                </div>
              )}
              <label>
                <div className="pf-photo-add-button pf-photo-buttons">
                  画像追加
                </div>
                <input
                  type="file"
                  onChange={onPhotoChange}
                  className="change-photo"
                  accept="image/*"
                ></input>
              </label>
            </div>
          </div>
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="お名前"
            placeholder="お名前"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="input"
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="メールアドレス"
            placeholder="メールアドレス"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="現在のパスワード"
            placeholder="現在のパスワードを入力してください"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="変更後のパスワード"
            placeholder="変更後のパスワードを入力してください"
            type="password"
            x
            onChange={(e) => setChangedPassword(e.target.value)}
            value={changedPassword}
          />
        </div>
        <div className="edit-container">
          <InputSelect
            label="ロケーション"
            placeholder="ロケーション"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            options={countries}
          />
        </div>
        <div className="edit-container">
          <RadioForm
            label="求める雇用形態"
            options={optionData.userLookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            value={lookingFor}
          />
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="プロフィールリンク (LinkedIn / GitHub / Website)"
            placeholder="https://www.linkedin.com/in/example"
            type="text"
            onChange={(e) => setLink1(e.target.value)}
            value={link1}
          />

          <InputText
            placeholder="https://github.com/example"
            type="text"
            onChange={(e) => setLink2(e.target.value)}
            value={link2}
          />

          <InputText
            placeholder="https://lraough.com/"
            type="text"
            onChange={(e) => setLink3(e.target.value)}
            value={link3}
          />
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
        <div className="buttonContainer">
          <Button variant="contained" className="save-button" type="submit">
            保存する
          </Button>
          <div
            className="cancel-button"
            onClick={() => history.push("/profile")}
          >
            <span>キャンセル</span>
          </div>
        </div>
      </form>
      {originPhotoSrc && (
        <TrimModal
          originPhotoSrc={originPhotoSrc}
          setPhotoBlob={setPhotoBlob}
          onClose={onClose}
          aspect={1 / 1}
          cropShape={"round"}
        />
      )}
    </div>
  );
};

export default ProfileEdit;
