import React, { useEffect, useState } from "react";
import JobBox from "./JobBox";
import database from "../../firebase/firebase";
import useJobListingsContext from "../../context/jobListing-context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./JobListings.scss";

const replaceLetters = (searchInput) =>
  searchInput.replace(/\s+/g, "").replace(/-/g, "").toLowerCase();

const JobListings = () => {
  const { jobListings, dispatchJobListings } = useJobListingsContext();
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);
  const [jobListingsArr, setJobListingsArr] = useState([]);

  const filterJobListings = () => {
    let convertSearchInput = searchInput;
    convertSearchInput = replaceLetters(convertSearchInput);
    console.log(convertSearchInput);
    const filteredJoblistings = jobListings.filter((jobListing) => {
      if (jobListing.jobTitle) {
        return (
          replaceLetters(jobListing.jobTitle).search(convertSearchInput) !== -1
        );
      }
    });
    console.log(filteredJoblistings);
    setJobListingsArr(
      filteredJoblistings.length !== 0 ? filteredJoblistings : null
    );
    setSearchInput("");
  };

  useEffect(() => {
    if (dispatchJobListings) {
      database
        .ref(`/jobListings`)
        .once("value")
        .then((snapshot) => {
          const jobListingsArray = [];
          snapshot.forEach((childSnapshot) => {
            jobListingsArray.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          dispatchJobListings({
            type: "SET_JOB_LISTINGS",
            jobListings: jobListingsArray,
          });
        });
    }
  }, [dispatchJobListings]);

  useEffect(() => {
    jobListings && setJobListingsArr(jobListings);
  }, []);

  useEffect(() => {
    jobListings && console.log(jobListings);
  }, [jobListings]);

  return (
    <>
      <div className="search-input-container">
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Search for a job"
          className="search-input"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              filterJobListings();
            }
          }}
        />
        <Button
          variant="contained"
          className="submit-btn"
          onClick={() => filterJobListings()}
        >
          Submit
        </Button>
      </div>
      <div className="joblisting-wrapper">
        {jobListingsArr === null ? (
          <>
            <p>No Result</p>
            <Link
              to="joblistings"
              onClick={() => setJobListingsArr(jobListings)}
            >
              Back to List
            </Link>
          </>
        ) : jobListingsArr.length === 0 ? (
          <div>Loading...</div>
        ) : (
          jobListingsArr.map((job) => (
            <React.Fragment key={job.id}>
              <JobBox {...job} />
            </React.Fragment>
          ))
        )}
      </div>
    </>
  );
};

export default JobListings;
