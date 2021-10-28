import React from "react";
import "./Wrapper.scss";
import { useLocation } from "react-router-dom";
import Header from "../HeaderAndFooter/Header/Header";
import Footer from "../HeaderAndFooter/Footer/Footer";
import Contact from "../Contact/Contact";

const Wrapper = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Header />
      <main
        className={
          location.pathname === "/apply-developer" ||
          location.pathname === "/apply-recruiter"
            ? ["main-parent", "no-padding-top"].join(" ")
            : "main-parent"
        }
      >
        {children}
      </main>
      <Contact />
      <Footer />
    </>
  );
};

export default Wrapper;
