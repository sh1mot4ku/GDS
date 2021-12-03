import React from "react";
import "./ui.scss";

const Modal = ({ children, onClose }) => (
  <div onClick={onClose} id="overlay">
    <div onClick={(e) => e.stopPropagation()} id="content">
      {children}
    </div>
  </div>
);

export default Modal;
