import React from "react";
import "./Wrapper.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Wrapper = ({ children }) => (
  <>
    <Header />
    <section className="main">
      <h1>this is wrapper component</h1>
      <div className="main__wrapper">{children}</div>
    </section>
    <Footer />
  </>
);

export default Wrapper;
