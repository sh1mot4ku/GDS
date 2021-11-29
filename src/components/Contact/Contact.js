import React from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import "./Contact.scss";

const Contact = (props) => {
  const location = useLocation();
  console.log(location);
  console.log(props);
  return (
    <>
      {location.pathname === "/apply-developer" ||
      location.pathname === "/apply-recruiter" ||
      location.pathname === "/job-list-detail" ||
      location.pathname === "/user-profile" ||
      location.pathname === "/contact" ||
      location.pathname === "/login" ? null : (
        <section className="contact-section">
          <p className="contact-title">CONTACT</p>
          <p className="contact-content">
            取材/お仕事のご依頼・お問い合わせはこちら
          </p>
          <Link to="/contact">
            <Button variant="contained" className="round-button">
              お問い合わせ
            </Button>
          </Link>
        </section>
      )}
    </>
  );
};

export default Contact;
