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

const replaceLettersAndCreateKeywordsArr = (searchInput) => {
  let keywordsArr = searchInput.toLowerCase().replace(/　/g, " ").split(" ");
  for (let i = 0; i < keywordsArr.length; i++) {
    if (keywordsArr[i] === "") {
      keywordsArr = keywordsArr.splice(i, 1);
      console.log(keywordsArr[i]);
    }
  }
  console.log(keywordsArr);
  return keywordsArr;
};

const JobListings = () => {
  const { jobListings, dispatchJobListings } = useJobListingsContext();
  const [searchInput, setSearchInput] = useState("");
  // const [searchKeywords, setSearchKeywords] = useState([]);
  const [jobListingsArr, setJobListingsArr] = useState([]);

  const filterJobListings2 = () => {
    let convertSearchInput = searchInput;
    // convertSearchInput = replaceLetters(convertSearchInput);
    let searchKeywordsArr =
      replaceLettersAndCreateKeywordsArr(convertSearchInput);

    console.log(searchKeywordsArr);

    let filteredJoblistingsbyTitles;
    let filteredJoblistingsbyDescriptions;
    let totalfilteredJobListings = [];
    for (let i = 0; i < searchKeywordsArr.length; i++) {
      filteredJoblistingsbyTitles = jobListings.filter((jobListing) => {
        if (jobListing.jobTitle) {
          return (
            replaceLetters(jobListing.jobTitle).search(searchKeywordsArr[i]) !==
            -1
          );
        }
      });
      filteredJoblistingsbyDescriptions = jobListings.filter((jobListing) => {
        if (jobListing.jobDescription) {
          return (
            replaceLetters(jobListing.jobDescription).search(
              searchKeywordsArr[i]
            ) !== -1
          );
        }
      });
      totalfilteredJobListings.push(
        ...filteredJoblistingsbyTitles,
        ...filteredJoblistingsbyDescriptions
      );
    }

    console.log(
      filteredJoblistingsbyTitles,
      filteredJoblistingsbyDescriptions,
      totalfilteredJobListings
    );
    setJobListingsArr(
      totalfilteredJobListings.length !== 0
        ? [...new Set(totalfilteredJobListings)]
        : ["no result"]
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
              filterJobListings2();
            }
          }}
        />
        <Button
          variant="contained"
          className="submit-btn"
          onClick={() => filterJobListings2()}
        >
          Submit
        </Button>
      </div>
      <div className="joblisting-wrapper">
        {jobListingsArr[0] === "no result" ? (
          <>
            <p>No Result</p>
            <Link
              to="joblistings"
              onClick={() => setJobListingsArr(jobListings)}
            >
              Back to List
            </Link>
          </>
        ) : jobListingsArr.length !== 0 ? (
          jobListingsArr.map((job) => (
            <React.Fragment key={job.id}>
              <JobBox {...job} />
            </React.Fragment>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default JobListings;
