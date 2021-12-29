import React from "react";
import { Link } from "react-router-dom";
import "./Contact.scss";
import '../ui/Button.scss'

const Contact = () => (
  <>
    <section className="contact-section">
      <p className="contact-title">CONTACT</p>
      <p className="contact-content">
        取材/お仕事のご依頼・お問い合わせはこちら
      </p>
      <Link to="/contact">
        <button className="btn-lg btn-contact" >
          お問い合わせ
        </button>
      </Link>
    </section>
  </>
);

export default Contact;
