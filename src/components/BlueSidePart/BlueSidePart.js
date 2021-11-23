import React from "react";
import "./BlueSidePart.scss";
import { useLocation } from "react-router-dom";

const BlueSidePart = () => {
  const location = useLocation();
  return (
    <>
      <div
        className={[
          "sidepart-container",
          location.pathname === "/apply-recruiter" ? "position-fixed" : null,
        ].join(" ")}
      >
        <div className="box"></div>
        <img alt="" src="/image/logo-white 1.png" className="logo" />
        <img alt="" src="/image/remoteStack.png" className="remoteStack" />
      </div>
    </>
  );
};

export default BlueSidePart;
