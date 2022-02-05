import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import JobBox from "./JobBox";
import OverviewList from "./OverviewList";
import "../ui/Button.scss";
import UrgeApplyModal from "../ui/UrgeApplyModal";
import momentTimezone from "moment-timezone";
import { functions } from "../../firebase/firebase";
import ThankYouForApplying from "./ThankYouForApplying";
import { setFullJobListing } from "../../API/dbutils";
import Loading from "../ui/Loading";
import "moment/locale/ja";
import "./ThankYouForApplying.scss";
import "./JobListing.scss";

const JobListing = () => {
  const { uid, emailVerified } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.user);
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [overview, setOverview] = useState(null);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  const onClose = () => {
    setIsReadMoreClicked(false);
  };

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
      setIsApplied(true);
    }
  };

  const setFullJobListingToJob = async () => {
    if (jobId) {
      const snapshot = await setFullJobListing(jobId);
      setJob({
        ...snapshot.val(),
        id: jobId,
      });
    }
  };

  useEffect(() => {
    setFullJobListingToJob();
  }, [jobId]);

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

  useEffect(() => {
    if (uid) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [uid]);

  useEffect(() => {
    if (emailVerified) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  }, [emailVerified]);

  return (
    <>
      {!isApplied ? (
        isUserLoggedIn === null ? (
          <p>Loading...</p>
        ) : (
          <div
            className={[
              "joblisting-details-wrapper",
              isUserLoggedIn === false || isEmailVerified === false
                ? "joblisting-details-wrapper-logout"
                : "",
            ].join(" ")}
          >
            {job ? (
              <>
                {(isUserLoggedIn === false || isEmailVerified === false) && (
                  <>
                    <div className="joblisting-details-mask"></div>
                    <button
                      className="btn-lg btn-fill read-more-btn"
                      onClick={(e) => setIsReadMoreClicked(true)}
                    >
                      続きを読む
                    </button>
                  </>
                )}
                <div className="bread-list">
                  <div className="bread-item">
                    <Link to="/joblistings" className="previous-link">
                      求人一覧
                    </Link>
                  </div>
                  <div className="bread-item">
                    <span>&gt;</span>
                  </div>
                  <div className="bread-item">
                    <span>{job.jobTitle}</span>
                  </div>
                </div>
                <JobBox {...job} details />
                <div className="job-description">
                  <h2 className="job-description-header">求人内容</h2>
                  <span className="job-description-content">
                    {job.jobListing}
                  </span>
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
                  <button
                    className="btn-lg btn-fill"
                    onClick={(e) => sendApplicationEmail(e)}
                  >
                    応募する
                  </button>
                </div>
                {isReadMoreClicked && (
                  <UrgeApplyModal
                    onClose={onClose}
                    isUserLoggedIn={isUserLoggedIn}
                    isEmailVerified={isEmailVerified}
                  />
                )}
              </>
            ) : (
              <Loading />
            )}
          </div>
        )
      ) : (
        <ThankYouForApplying />
      )}
    </>
  );
};

export default JobListing;
