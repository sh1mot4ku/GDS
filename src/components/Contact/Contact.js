import React from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import "./Contact.scss";

const Contact = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/apply-developer" ||
      location.pathname === "/apply-recruiter" ? null : (
        <section className="contact-section">
          <p className="contact-title">CONTACT</p>
          <p className="contact-content">
            取材/お仕事のご依頼・お問い合わせはこちら
          </p>
          <Button variant="contained" className="round-button">
            お問い合わせ
          </Button>
        </section>
      )}
    </>
  );
};

export default Contact;
