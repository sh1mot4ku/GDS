import React, { useEffect } from "react";
import "./Wrapper.scss";
import { useLocation } from "react-router-dom";
import Header from "../HeaderAndFooter/Header/Header";
import Footer from "../HeaderAndFooter/Footer/Footer";
import Contact from "../Contact/Contact";
import ScrollTop from "./ScrollTop";

const Wrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <Header />
      <ScrollTop>
        <main
          className={
            location.pathname === "/apply-developer" ||
            location.pathname === "/apply-recruiter" ||
            location.pathname === "/contact" ||
            location.pathname === "/login"
              ? ["main-parent", "no-padding-top"].join(" ")
              : "main-parent"
          }
        >
          {children}
        </main>
        <Contact />
      </ScrollTop>
      <Footer />
    </>
  );
};

export default Wrapper;
