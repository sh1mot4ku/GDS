import React from "react";
import Modal from "./Modal";
import Button from "@mui/material/Button";
import "./ui.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const UrgeApplyModal = (props) => {
  return (
    <>
      <Modal onClose={props.onClose}>
        <div className="urgeApply-container">
          <CloseIcon className="close-icon" onClick={props.onClose} />
          <img
            src="/photos/img-joblists-detail.png"
            className="img-joblists-detail"
          ></img>
          <p className="text">続きを見るには会員登録が必要です</p>
          <Link to="/apply-developer" className="apply-link">
            <Button variant="contained" className="apply-button">
              無料会員登録
            </Button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default UrgeApplyModal;
