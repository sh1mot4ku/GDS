import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useJobListingsContext from '../../context/jobListing-context';
import JobBox from './JobBox';
import "./JobListing.scss";

const JobListing = () => {
  const { jobListings, dispatchJobListings } = useJobListingsContext();
  const [job, setJob] = useState(null);
  const [overview, setOverview] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (jobListings && id) {
      const matchedJob = jobListings.filter(job => job.id === id);
      if (matchedJob.length === 1) {
        setJob(matchedJob[0]);
      }
    }
  }, [jobListings, id]);

  useEffect(() => {
    if (job) {
      console.log(job);
      const {
        jobTitle,
        companyName,
        workPlacePolicy,
        employeeLocation,
        employmentType,
        jobListing,
        jobDescription,
        annualSalaly,
        skills,
        must,
        welcome,
        workingHours,
        leaves
      } = job;
      setOverview({
        業務内容: jobDescription,
        必須条件: must,
        歓迎条件: welcome,
        勤務地: employeeLocation,
        雇用形態: employmentType,
        想定年収: annualSalaly,
        勤務時間: workingHours,
        休日休暇: leaves
      });
    } 
  }, [job])

  return (
    <div className="joblisting-details-wrapper">
      {job ? (
        <>
          <JobBox {...job} details={true} />
          <div className="job-description">
            <h2>求人内容</h2>
            <span>{ job.jobDescription }</span>
          </div>
          <div>
            <h2>概要</h2>
            {
              
            }
            {/* <OverviewList title={ 業務内容 }/> */}
          </div>
        {/* // <React.Fragment>
        //   <div>{job.jobTitle}</div>
        //   <div>{job.companyName}</div>
        //   <div>{job.employeeLocation}</div>
        //   <div>{job.skills}</div>
        //   <div>{job.jobDescription}</div>
        // </React.Fragment> */}
        </>
      ) : (
        <div>
          Loading....
        </div>
      )}

    </div>
  )
}

export default JobListing
