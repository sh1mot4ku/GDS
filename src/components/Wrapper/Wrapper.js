import React, { useEffect } from "react";
import "./Wrapper.scss";
import judgeWrapperLayout from "../../router/judgeWrapperLayout";
import { useLocation } from "react-router-dom";
import Header from "../HeaderAndFooter/Header/Header";
import Footer from "../HeaderAndFooter/Footer/Footer";
import Contact from "../Contact/Contact";
import PostAndManageSideBar from "./PostAndManageSideBar/PostAndManageSideBar";
import ScrollTop from "./ScrollTop";

const Wrapper = ({ children }) => {
  const location = useLocation();

  // judgeWrapperLayout using useEffect

  return (
    <>
      <Header />
      <PostAndManageSideBar />
      <ScrollTop>
        <main
          className={
            location.pathname === "/apply-developer" ||
            location.pathname === "/apply-recruiter" ||
            location.pathname === "/contact" ||
            location.pathname === "/login" ||
            location.pathname === "/forget-password"
              ? ["main-parent", "no-padding-top"].join(" ")
              : location.pathname === "/joblistings_management" ||
                location.pathname === "/post_joblistings" ||
                location.pathname.includes("/edit_joblisting/")
              ? ["main-parent", "padding-left-top"].join(" ")
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
