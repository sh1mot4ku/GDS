import React from "react";
import "./ui.scss";

const Modal = ({ children, onClose, imgCrop }) => (
  <div onClick={onClose} id="overlay">
    <div
      onClick={(e) => e.stopPropagation()}
      id="content"
      className={imgCrop && "img-crop"}
    >
      {children}
    </div>
  </div>
);

export default Modal;
