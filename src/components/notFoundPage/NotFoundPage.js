import React from "react";
import Typist from "react-typist";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NotfoundPage.scss";
import "react-typist/dist/Typist.css";

const Page404 = () => {
  const { uid } = useSelector((state) => state.user);

  return (
    <>
      <div className="page-not-found-container">
        <Typist
          avgTypingDelay={80}
          stdTypingDelay={50}
          cursor={{ blink: true, element: "|" }}
          className="text"
        >
          <Typist.Delay ms={300} />
          404, page not found
        </Typist>
        <Link to={uid ? "/joblistings" : "/"} className="link-to-home">
          Home
        </Link>
      </div>
    </>
  );
};

export default Page404;
