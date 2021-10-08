import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./JobBox.scss";

const MAX_LENGTH_OF_JD = 100;

const JobBox = ({
  jobTitle,
  companyName,
  workPlacePolicy,
  employeeLocation,
  employmentType,
  jobDescription,
  skills,
  annualSalaly,
  id,
  details
}) => {
  const [shortJd, setShortJD] = useState('');

  useEffect(() => {
    jobDescription && setShortJD(jobDescription.substr(0, MAX_LENGTH_OF_JD));
  }, [jobDescription])

  return (
    <div className="job-box">
      <Link to={`/joblisting/${id}`}>
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
          {
            Array.isArray(skills) && skills.length !== 0 && (
              skills.map(skill => (
                <div className="skill-tag-wrapper" key={skill}>
                  <span className="skill-tag">{ skill }</span>
                </div>
              ))
            )
          }
        </div>
        {
          details ? (
            <React.Fragment>{ "いつ作成されたか" }</React.Fragment>
          ) : (
            <div className="job-box-content">
              <span className="short-jd">{shortJd}</span>
            </div>
          )
        }
      </Link>
    </div>
  )
}

export default JobBox
