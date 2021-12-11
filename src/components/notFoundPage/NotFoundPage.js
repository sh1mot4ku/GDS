import React from "react";
import Typist from "react-typist";
import "./NotfoundPage.scss";
import "react-typist/dist/Typist.css";

const Page404 = () => (
  <>
    <div className="page-not-found-container">
      <Typist
        avgTypingDelay={80}
        stdTypingDelay={50}
        cursor={{ blink: true, element: "|" }}
        className="text"
      >
        404, page not found
      </Typist>
    </div>
  </>
);

export default Page404;
