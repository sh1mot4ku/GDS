import React from "react";
import "./Wrapper.scss";
import Header from "../HeaderAndFooter/Header/Header";
import Footer from "../HeaderAndFooter/Footer/Footer";
import Contact from "../Contact/Contact";

const Wrapper = ({ children }) => (
  <>
    <Header />
    <main className="main-parent">{children}</main>
    <Contact />
    <Footer />
  </>
);

export default Wrapper;
