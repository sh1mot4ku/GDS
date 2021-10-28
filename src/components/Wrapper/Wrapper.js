import React from "react";
import "./Wrapper.scss";
import Header from "../HeaderAndFooter/Header/Header";
import Footer from "../HeaderAndFooter/Footer/Footer";

const Wrapper = ({ children }) => (
  <>
    <Header />
    <main className="main-parent">{children}</main>
    <Footer />
  </>
);

export default Wrapper;
