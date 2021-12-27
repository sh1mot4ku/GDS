import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./JobBox.scss";

const JobBox = ({
  photoUrl,
  jobTitle,
  companyName,
  employeeLocation,
  jobListing,
  tags,
  id,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    isOpenMenu && menuRef.current.focus();
  }, [isOpenMenu]);

  return (
    <div className="job-box">
      <Link to={`/edit_joblisting/${id}`}>
        <div className="job-wrapper">
          <div className="job-img-wrapper">
            <img src={photoUrl} className="job-img" alt="top-job"></img>
          </div>
          <div>
            <div className="job-box-content">
              <span className="job-title">{jobTitle}</span>
            </div>
            <div className="job-box-content">
              <span className="company-name">{companyName}</span>
            </div>
            <div className="job-box-content">
              <span className="location">{employeeLocation}</span>
            </div>
            <div className="job-box-skill-tags">
              {Array.isArray(tags) &&
                tags.length !== 0 &&
                tags.map((skill) => (
                  <div className="skill-tag-wrapper" key={skill}>
                    <span className="skill-tag">{skill}</span>
                  </div>
                ))}
            </div>
            <div className="job-box-content">
              <span className="short-jd">{jobListing}</span>
            </div>
          </div>
        </div>
      </Link>
      <div
        className="meatballs-menu-wrapper"
        ref={menuRef}
        onBlur={() => setIsOpenMenu(false)}
        tabIndex={1}
      >
        {!isOpenMenu ? (
          <div className="meatballs-menu" onClick={() => setIsOpenMenu(true)}>
            …
          </div>
        ) : (
          <div className="meatballs-menu-list-wrapper">
            <div className="meatballs-menu-list">
              <img
                src="/photos/chevron-right 2.svg"
                alt="chevron"
                className="list-icon"
              />
              <span>複製</span>
            </div>
            <div className="meatballs-menu-list" id="delete">
              <DeleteIcon className="list-icon" />
              <span>削除</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBox;
