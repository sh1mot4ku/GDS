import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Contact.scss';
import '../ui/Button.scss'

const Contact = (props) => {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/apply-developer' ||
      location.pathname === '/apply-recruiter' ||
      location.pathname === '/job-list-detail' ||
      location.pathname === '/user-profile' ||
      location.pathname === '/contact' ||
      location.pathname === '/login' ||
      location.pathname === "/forget-password" ||
      location.pathname === '/post_joblistings' ||
      location.pathname === '/joblistings_management' ||
      location.pathname.includes('/edit_joblisting/') ||
      location.pathname.includes('/joblisting/') ? null : (
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
      )}
    </>
  );
};

export default Contact;
