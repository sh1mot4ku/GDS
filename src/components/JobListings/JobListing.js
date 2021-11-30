import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import JobBox from "./JobBox";
import OverviewList from "./OverviewList";
import Button from "@material-ui/core/Button";
import "./JobListing.scss";
import momentTimezone from "moment-timezone";
import { functions } from "../../firebase/firebase";
import ThankYouForApplying from "./ThankYouForApplying";
import { startSetJobListings } from "../../action/jobListings";
import "./ThankYouForApplying.scss";

const JobListing = () => {
  const dispatch = useDispatch();
  const jobListings = useSelector((state) => state.jobListings);
  const [job, setJob] = useState(null);
  const [overview, setOverview] = useState(null);
  const { jobId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const [isApplied, setIsApplied] = useState(false);

  const sendApplicationEmail = (e) => {
    e.preventDefault();
    const currentPacificTime = momentTimezone()
      .tz("America/Los_Angeles")
      .format("MMMM Do YYYY, h:mm a z");
    if (userInfo) {
      const userInfoForApplication = {
        applicant: userInfo.profile.fullName,
        applicantEmail: userInfo.profile.email,
        appliedOn: currentPacificTime,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobListingId: job.id,
      };
      const sendApplicationMail = functions.httpsCallable(
        "sendApplicationMail"
      );
      sendApplicationMail(userInfoForApplication);
      console.log("submitted");
      setIsApplied(true);
    }
  };

  useEffect(() => {
    if (jobListings.length !== 0 && jobId) {
      const matchedJob = jobListings.find((job) => job.id === jobId);
      setJob(matchedJob);
    } else if (jobListings.length === 0) {
      dispatch(startSetJobListings());
    }
  }, [jobListings, jobId]);

  useEffect(() => {
    if (job) {
      const {
        employeeLocation,
        employmentType,
        jobDescription,
        annualSalaly,
        must,
        welcome,
        workingHours,
        leaves,
      } = job;
      setOverview([
        {
          key: "業務内容",
          value: jobDescription,
        },
        {
          key: "必須条件",
          value: must,
        },
        {
          key: "歓迎条件",
          value: welcome,
        },
        {
          key: "勤務地",
          value: employeeLocation,
        },
        {
          key: "雇用形態",
          value: employmentType,
        },
        {
          key: "想定年収",
          value: annualSalaly,
        },
        {
          key: "勤務時間",
          value: workingHours,
        },
        {
          key: "休日休暇",
          value: leaves,
        },
      ]);
    }
  }, [job]);

  return (
    <>
      {!isApplied ? (
        <div className="joblisting-details-wrapper">
          {job ? (
            <>
              <JobBox {...job} details={true} />
              <div className="job-description">
                <h2>求人内容</h2>
                <span>{job.jobDescription}</span>
              </div>
              <div className="overview">
                <h2 className="overview-header">概要</h2>
                {overview &&
                  overview.map((element) => (
                    <OverviewList
                      title={element.key}
                      text={element.value}
                      key={element.key}
                    />
                  ))}
              </div>
              <div className="oubo-wrapper">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => sendApplicationEmail(e)}
                >
                  応募する
                </Button>
              </div>
            </>
          ) : (
            <div>Loading....</div>
          )}
        </div>
      ) : (
        <ThankYouForApplying />
      )}
    </>
  );
};

export default JobListing;
