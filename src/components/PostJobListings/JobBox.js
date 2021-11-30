import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobBox.scss";

const MAX_LENGTH_OF_JD = 100;

const JobBox = ({
  photoUrl,
  jobTitle,
  companyName,
  employeeLocation,
  jobDescription,
  tags,
  id,
}) => {
  const [shortJd, setShortJD] = useState("");

  useEffect(() => {
    jobDescription && setShortJD(jobDescription.substr(0, MAX_LENGTH_OF_JD));
  }, [jobDescription]);

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
            <div className="job-box-content">
              {Array.isArray(tags) &&
                tags.length !== 0 &&
                tags.map((skill) => (
                  <div className="skill-tag-wrapper" key={skill}>
                    <span className="skill-tag">{skill}</span>
                  </div>
                ))}
            </div>
            <div className="job-box-content">
              <span className="short-jd">{shortJd}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobBox;
