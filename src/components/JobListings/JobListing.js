import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useJobListingsContext from '../../context/jobListing-context';

const JobListing = () => {
  const { jobListings, dispatchJobListings } = useJobListingsContext();
  const [job, setJob] = useState(null);
  const idParam = useParams();

  useEffect(() => {
    if (jobListings && idParam) {
      const matchedJob = jobListings.filter(job => job.id === idParam);
      if (matchedJob.length === 1) {
        setJob(matchedJob[0]);
      }
    }
  }, [jobListings, idParam])

  return (
    <div>
      {job ? (
        <React.Fragment>
          <div>{job.jobTitle}</div>
          <div>{job.companyName}</div>
          <div>{job.employeeLocation}</div>
          <div>{job.skills}</div>
          <div>{job.jobDescription}</div>
        </React.Fragment>
      ) : (
        <div>
          Loading....
        </div>
      )}

    </div>
  )
}

export default JobListing
