import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import JobBox from "./JobBox";
import OverviewList from "./OverviewList";
import Button from "@material-ui/core/Button";
import "./JobListing.scss";
import UrgeApplyModal from "../ui/UrgeApplyModal";

const JobListing = () => {
  const jobListings = useSelector((state) => state.jobListings);
  const [job, setJob] = useState(null);
  const [overview, setOverview] = useState(null);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const { id } = useParams();
  const { uid } = useSelector((state) => state.user);
  console.log(uid);

  const onClose = () => {
    setIsReadMoreClicked(false);
  };

  useEffect(() => {
    if (jobListings && id) {
      const matchedJob = jobListings.filter((job) => job.id === id);
      if (matchedJob.length === 1) {
        setJob(matchedJob[0]);
      }
    }
  }, [jobListings, id]);

  useEffect(() => {
    if (job) {
      console.log(job);
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

  useEffect(() => {
    if (uid) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [uid]);

  return (
    <>
      {isUserLoggedIn === null ? (
        <p>Loading...</p>
      ) : (
        <div
          className={[
            "joblisting-details-wrapper",
            isUserLoggedIn === false && "joblisting-details-wrapper-logout",
          ].join(" ")}
        >
          {job ? (
            <>
              {isUserLoggedIn === false && (
                <>
                  <div className="joblisting-details-mask"></div>
                  <Button
                    variant="contained"
                    className="round-button"
                    onClick={(e) => setIsReadMoreClicked(true)}
                  >
                    続きを読む
                  </Button>
                </>
              )}

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
                <Button variant="contained" color="primary">
                  応募する
                </Button>
              </div>
              {isReadMoreClicked && <UrgeApplyModal onClose={onClose} />}
            </>
          ) : (
            <div>Loading....</div>
          )}
        </div>
      )}
    </>
  );
};

export default JobListing;
