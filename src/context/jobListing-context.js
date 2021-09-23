import React, { createContext, useReducer, useContext } from 'react';
import jobListingsReducer from '../reducer/jobListings';

const JobListingsContext = createContext();

const JobListingsProvider = ({ children }) => {
  const [jobListings, dispatchJobListings] = useReducer(jobListingsReducer, []);

  return (
    <JobListingsContext.Provider value={{ jobListings, dispatchJobListings }} >
      {children}
    </JobListingsContext.Provider>
  );
};

const useJobListingsContext = () => useContext(JobListingsContext);

export { useJobListingsContext as default, JobListingsProvider }