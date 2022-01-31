import React from "react";
import "./BlueSidePart.scss";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlueSidePart = () => {
  const location = useLocation();
  const { uid } = useSelector((state) => state.user);
  return (
    <>
      <div
        className={[
          "sidepart-container",
          location.pathname === "/apply-recruiter" ||
          location.pathname === "/apply-developer" ||
          location.pathname === "/thank-you"
            ? "position-fixed"
            : null,
        ].join(" ")}
      >
        <div className="box"></div>
        <Link to={uid ? "/joblistings" : "/"}>
          <img alt="" src="/image/logo-white 1.png" className="logo" />
        </Link>
        <img alt="" src="/image/remoteStack.png" className="remoteStack" />
      </div>
    </>
  );
};

export default BlueSidePart;
