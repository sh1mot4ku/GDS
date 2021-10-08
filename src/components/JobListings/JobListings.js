import React, { useEffect } from 'react';
import JobBox from './JobBox';
import database from '../../firebase/firebase';
import useJobListingsContext from '../../context/jobListing-context';
import './JobListings.scss';

const JobListings = () => {
  const { jobListings, dispatchJobListings } = useJobListingsContext();

  useEffect(() => {
    if (dispatchJobListings) {
      database.ref(`/jobListings`).once('value').then((snapshot) => {
        const jobListingsArray = [];
        snapshot.forEach((childSnapshot) => {
          jobListingsArray.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        });
        dispatchJobListings({
          type: 'SET_JOB_LISTINGS',
          jobListings: jobListingsArray
        });
      })
    }
  }, [dispatchJobListings]);

  useEffect(() => {
    jobListings && console.log(jobListings);
  }, [jobListings])

  return (
    <div className="joblisting-wrapper">
      {jobListings.length === 0 ? (
        <div>Loading...</div>
      ) : (
        jobListings.map(job => (
          <React.Fragment key={job.id}>
            <JobBox {...job} />
          </React.Fragment>
        ))
      )}
    </div>
  )
}

export default JobListings
