import React from "react";
import "./BlueSidePart.scss";
import { useLocation, Link } from "react-router-dom";

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
        <Link to="/joblistings">
          <img alt="" src="/image/logo-white 1.png" className="logo" />
        </Link>
        <img alt="" src="/image/remoteStack.png" className="remoteStack" />
      </div>
    </>
  );
};

export default BlueSidePart;
