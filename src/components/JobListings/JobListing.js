import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useJobListingsContext from '../../context/jobListing-context';

const JobListing = () => {
  const { jobListings, dispatchJobListings } = useJobListingsContext();
  const idParam = useParams();

  useEffect(() => {
    if (jobListings && idParam) {
      const matchedJob = jobListings.filter(job => job.id === idParam);
      if (matchedJob.length === 1) {

      }
    }
  }, [jobListings, idParam])

  return (
    <div>

    </div>
  )
}

export default JobListing
