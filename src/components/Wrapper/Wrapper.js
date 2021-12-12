import React, { useEffect, useState } from "react";
import "./Wrapper.scss";
import judgeWrapperLayout from "../../router/judgeWrapperLayout";
import { useLocation } from "react-router-dom";
import Header from "../HeaderAndFooter/Header/Header";
import Footer from "../HeaderAndFooter/Footer/Footer";
import Contact from "../Contact/Contact";
import PostAndManageSideBar from "./PostAndManageSideBar/PostAndManageSideBar";
import ScrollTop from "./ScrollTop";

const Wrapper = ({ children }) => {
  const { pathname } = useLocation();
  const [wrapperLayout, setWrapperLayout] = useState(null);
  console.log(wrapperLayout);

  useEffect(() => {
    const layout = judgeWrapperLayout(pathname);
    setWrapperLayout(layout);
  }, []);

  return (
    <>
      {wrapperLayout && (
        <>
          {wrapperLayout.header && <Header />}
          {wrapperLayout.sideBar && <PostAndManageSideBar />}
          <ScrollTop>
            <main
              className={
                !wrapperLayout.header && !wrapperLayout.sideBar
                  ? ["main-parent", "no-padding-top"].join(" ")
                  : wrapperLayout.sideBar
                  ? ["main-parent", "padding-left-top"].join(" ")
                  : "main-parent"
              }
            >
              {children}
            </main>
            {wrapperLayout.contactSection && <Contact />}
          </ScrollTop>
          {wrapperLayout.footer && <Footer />}
        </>
      )}
    </>
  );
};

export default Wrapper;
