import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { turnOffProfileEdited } from "../../action/user";
import "./Profile.scss";

const DEFAULT_PHOTO = "/image/icon-login-lg-user.svg";

const Profile = () => {
  const { uid, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    // delete an indicator to let user know profile edited when this component unmounted
    return () => {
      dispatch(turnOffProfileEdited());
    };
  }, []);

  return (
    <>
      {uid ? (
        <div
          className={[
            "main-profile",
            pathname === "/profile" && "padding-top",
          ].join(" ")}
        >
          {userInfo?.profileEdited && (
            <div
              className={[
                "pf-edited-indicator",
                pathname === "/profile"
                  ? "pf-edited-indicator-top-0"
                  : "pf-edited-indicator-top",
              ].join(" ")}
            >
              プロフィールの変更が完了しました！
            </div>
          )}
          <div className="pf-container pf-container--top">
            <img
              alt="user-icon"
              src={userInfo.profile.photoUrl || DEFAULT_PHOTO}
              className="user-icon"
            />
            <div>
              <div className="pf-name">{userInfo.profile.fullName}</div>
              <div className="pf-country">{userInfo.profile.location}</div>
              <Link
                to={
                  pathname === "/profile"
                    ? "/profile_edit"
                    : "/profile-edit-recruiter-page"
                }
              >
                <button className="pf-button">プロフィール編集</button>
              </Link>
            </div>
          </div>
          <div className="pf-container">
            <div className="pf-title">お名前</div>
            <div className="pf-data">{userInfo.profile.fullName}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">メールアドレス</div>
            <div className="pf-data">{userInfo.profile.email}</div>
          </div>
          <div className="pf-container">
            <div className="pf-title">パスワード</div>
            <div className="pf-data">{"*".repeat(userInfo.profile.pl)}</div>
          </div>
          {userInfo.userType === "developer" && (
            <React.Fragment>
              <div className="pf-container">
                <div className="pf-title">求める雇用形態</div>
                <div className="pf-data">{userInfo.profile.lookingFor}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">LINK 01</div>
                <div className="pf-data">{userInfo.profile.links.link1}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">LINK 02</div>
                <div className="pf-data">{userInfo.profile.links.link2}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">LINK 03</div>
                <div className="pf-data">{userInfo.profile.links.link3}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">英語レベル</div>
                <div className="pf-data">{userInfo.profile.englishLevel}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">ご自身の職種</div>
                <div className="pf-data">{userInfo.profile.description}</div>
              </div>
            </React.Fragment>
          )}
          {userInfo.userType === "recruiter" && (
            <React.Fragment>
              <div className="pf-container">
                <div className="pf-title">会社所在地</div>
                <div className="pf-data">{userInfo.profile.companyAddress}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">募集職種</div>
                <div className="pf-data">{userInfo.profile.lookingFor}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">コミット時間</div>
                <div className="pf-data">{userInfo.profile.commitment}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">必須条件・スキル</div>
                <div className="pf-data">{userInfo.profile.mustHave}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">歓迎するスキル</div>
                <div className="pf-data">{userInfo.profile.niceToHave}</div>
              </div>
              <div className="pf-container">
                <div className="pf-title">業務内容</div>
                <div className="pf-data">{userInfo.profile.projectDetail}</div>
              </div>
            </React.Fragment>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
