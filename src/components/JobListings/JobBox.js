import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ja";
import "./JobBox.scss";

const JobBox = ({
  photoUrl,
  jobTitle,
  companyName,
  employeeLocation,
  jobListing,
  tags,
  id,
  postedTimeStamp,
  details,
}) => {
  const [timeLag, setTimeLag] = useState(null);

  useEffect(() => {
    moment.locale("ja");
  }, []);

  useEffect(() => {
    if (details && postedTimeStamp) {
      const lag = moment(postedTimeStamp).fromNow();
      setTimeLag(lag);
    }
  }, [details, postedTimeStamp]);

  return (
    <div className="job-box">
      <Link to={`/joblisting/${id}`} className={details && "disabled-link"}>
        <div className="job-img-wrapper">
          <img src={photoUrl} className="job-img" alt="top-job"></img>
        </div>
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
        {details && timeLag ? (
          <div className="timestamp">{timeLag}に掲載</div>
        ) : (
          <div className="job-box-content">
            <span className="short-jd">{jobListing}</span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default JobBox;
