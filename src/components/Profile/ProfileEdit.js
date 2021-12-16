import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import InputTextAndLabel from "../ui/InputTextAndLabel";
import { useSelector, useDispatch } from "react-redux";
import TrimModal from "../ui/TrimModal";
import { readFile } from "../../readImage/cropImage";
import database, { firebase, storage, auth } from "../../firebase/firebase";
import { editUserInfo, turnOnProfileEdited } from "../../action/user";
import "./ProfileEdit.scss";
import ProfileEditClient from "./ProfileEditClient";
import ProfileEditRecruiter from "./ProfileEditRecruiter";
import validator from "validator";

const DEFAULT_PHOTO = "/image/icon-user.png";

const ProfileEdit = () => {
  const history = useHistory();
  const { uid, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [photoBlob, setPhotoBlob] = useState(null);
  const [originPhotoSrc, setOriginPhotoSrc] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(
    userInfo?.profile.photoUrl || DEFAULT_PHOTO
  );
  const [storageRef, setStorageRef] = useState("");
  const [fullName, setFullName] = useState(userInfo?.profile.fullName || "");
  const [email, setEmail] = useState(userInfo?.profile.email || "");
  const [password, setPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [lastHalfForm, setLastHalfForm] = useState({});
  const [nameError, setNameError] = useState(null);
  const [emailInvalidError, setEmailInvalidError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordInvalidError, setPasswordInvalidError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");

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

  const onHandleInputs = (e) => {
    firebaseErrorMessage.length !== 0 && setFirebaseErrorMessage("");
    switch (e.target.name) {
      case "fullname":
        validator.isLength(e.target.value, 0, 50) &&
          setFullName(e.target.value);
        (nameError || nameError === null) && setNameError(false);
        break;
      case "email":
        validator.isLength(e.target.value, 0, 254) && setEmail(e.target.value);
        (emailInvalidError || emailInvalidError === null) &&
          setEmailInvalidError(false);
        (emailError || emailError === null) && setEmailError(false);
        break;
      case "password":
        validator.isLength(e.target.value, 0, 32) &&
          setChangedPassword(e.target.value);
        (passwordInvalidError || passwordInvalidError === null) &&
          setPasswordInvalidError(false);
        (passwordError || passwordError === null) && setPasswordError(false);
        break;
    }
  };

  const validateAndTailorInput = (input, whatInput) => {
    if (!input.match(/\S/g)) {
      switch (whatInput) {
        case "fullname":
          setFullName("");
          setNameError(true);
          break;
      }
    }
  };

  const validatePassword = (inputPassword) => {
    const regex =
      // /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
      /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9~`! @#\$%\^&*()_\-\+=\{\[\}\]\|\\:;"'<,>\.\?/]{7,32}$/;
    if (!regex.test(inputPassword) || inputPassword.length < 7) {
      setPasswordInvalidError(true);
      return false;
    } else {
      setPasswordInvalidError(
        (prevState) => (prevState || prevState === null) && false
      );
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // validate changed password
    if (!validatePassword(changedPassword)) return;

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
        switch (e.code) {
          case "auth/user-mismatch":
            setFirebaseErrorMessage("アカウントが見つかりませんでした");
            break;
          case "auth/user-not-found":
            setFirebaseErrorMessage("一致するアカウントが見つかりませんでした");
            break;
          case "auth/invalid-credential":
            setFirebaseErrorMessage("無効な認証情報です");
            break;
          case "auth/invalid-email":
            setFirebaseErrorMessage("無効なEメールアドレスです");
            break;
          case "auth/wrong-password":
            setFirebaseErrorMessage("パスワードが間違っています");
            break;
          default:
            setFirebaseErrorMessage(
              "予期しないエラーが発生しました。再度登録してください。"
            );
        }
        return; // don't proceed to posting process if user can't login
      }
    }
    const postingInfo = {
      profile: {
        fullName,
        email,
        pl: changedPassword.length,
        photoUrl,
        ...lastHalfForm,
      },
      userType: userInfo.userType,
    };
    database
      .ref(`/user/${uid}`)
      .set(postingInfo)
      .then(() => {
        // add flag to indicate profile edited only to Redux
        postingInfo.profileEdited = true;
        dispatch(editUserInfo(postingInfo));
        console.log("Editted Successfully!");
        // dispatch(turnOnProfileEdited());
        history.push("/profile");
      });
  };

  return (
    <div className="main-edit">
      <form onSubmit={onSubmit} className="edit-form">
        <div className="pf-container">
          <img alt="user-icon" src={photoUrl} className="user-icon" />
          <div>
            <div className="pf-name">{userInfo?.profile.fullName}</div>
            <div className="pf-country">{userInfo.profile.location || ""}</div>
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
            placeholder="例)山田 太郎"
            type="text"
            onChange={(e) => onHandleInputs(e)}
            value={fullName}
            name="fullname"
          />
          {nameError && (
            <p className="error-message">お名前が記入されていません</p>
          )}
        </div>
        <div className="edit-container">
          <InputTextAndLabel
            label="メールアドレス"
            placeholder="example@example.com"
            type="email"
            onChange={(e) => onHandleInputs(e)}
            value={email}
            name="email"
          />
          {emailError && (
            <p className="error-message">メールアドレスが記入されていません</p>
          )}
          {emailInvalidError && (
            <p className="error-message">メールアドレスが無効です</p>
          )}
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
            onChange={(e) => onHandleInputs(e)}
            value={changedPassword}
            name="password"
          />
          {passwordInvalidError && (
            <p className="error-message">
              7文字以上、文字と数字を組み合わせて入力してください
            </p>
          )}
          {passwordError && (
            <p className="error-message">パスワードを入力してください</p>
          )}
        </div>
        {userInfo.userType === "client" && (
          <ProfileEditClient
            setLastHalfForm={setLastHalfForm}
            {...userInfo.profile}
          />
        )}
        {userInfo.userType === "recruiter" && (
          <ProfileEditRecruiter
            setLastHalfForm={setLastHalfForm}
            {...userInfo.profile}
          />
        )}

        {firebaseErrorMessage.length !== 0 && (
          <p className="error-message firebase-err-message">
            {firebaseErrorMessage}
          </p>
        )}

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
