import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  id
}) => {
  const [shortJd, setShortJD] = useState('');

  useEffect(() => {
    jobDescription && setShortJD(jobDescription.substr(0, MAX_LENGTH_OF_JD));
  }, [jobDescription])

  return (
    <div>
      <Link to="/">
        <div>{jobTitle}</div>
        <div>{companyName}</div>
        <div>{employeeLocation}</div>
        <div>{skills}</div>
        <div>{shortJd}</div>
      </Link>
    </div>
  )
}

export default JobBox
