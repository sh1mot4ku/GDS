import React, { useEffect } from "react";

const ScrollTop = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  return <div>{children}</div>;
};

export default ScrollTop;
