import React from "react";
import Modal from "./Modal";
import "../ui/Button.scss";
import "./ui.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";

const UrgeApplyModal = ({ onClose, isUserLoggedIn, isEmailVerified }) => {
  const history = useHistory();
  const onVerificateMail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await auth.currentUser.sendEmailVerification({
          url: `${window.location.origin}/thank-you`,
        });
        history.push({
          pathname: "/send-mail-confirm",
          state: { email: user.email },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {(!isUserLoggedIn || !isEmailVerified) && (
        <Modal onClose={onClose}>
          <div className="urgeApply-container">
            <CloseIcon className="close-icon" onClick={onClose} />
            <img
              src="/photos/img-joblists-detail.png"
              className="img-joblists-detail"
              alt="joblists-detail"
            ></img>
            {!isUserLoggedIn ? (
              <>
                <p className="text">続きを見るには会員登録が必要です</p>
                <Link to="/apply-developer" className="apply-link">
                  <button className="btn-lg btn-fill">無料会員登録</button>
                </Link>
                <Link to="/login" className="login-link">
                  ログインはこちら
                </Link>
              </>
            ) : (
              !isEmailVerified && (
                <>
                  <p className="text">
                    続きを見るにはメールアドレス認証が必要です。
                    <br />
                    メールをご確認いただき、メールに記載された URL
                    をクリックして、
                    <br />
                    Global Developersへの登録を完了してください。
                  </p>
                  <div onClick={onVerificateMail} className="apply-link">
                    <button className="btn-lg btn-fill">
                      メールアドレス認証へ
                    </button>
                  </div>
                </>
              )
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default UrgeApplyModal;
