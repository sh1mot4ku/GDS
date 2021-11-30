import React, { useEffect, useState } from "react";
import JobBox from "./JobBox";
import database from "../../firebase/firebase";
import useJobListingsContext from "../../context/jobListing-context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ChipInputAutosuggest from "../ui/SkillInput";
import skillsSuggestion from "../../data/skills/integration";
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
  return keywordsArr;
};

const JobListings = () => {
  const { jobListings, dispatchJobListings } = useJobListingsContext();
  const [searchInput, setSearchInput] = useState("");
  const [jobListingsArr, setJobListingsArr] = useState([]);
  const [tags, setTags] = useState([]);

  const filterJobListings = () => {
    let convertSearchInput = searchInput;
    let searchKeywordsArr =
      replaceLettersAndCreateKeywordsArr(convertSearchInput);
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
    setJobListingsArr(
      totalfilteredJobListings.length !== 0
        ? [...new Set(totalfilteredJobListings)]
        : ["no result"]
    );
    tags.length !== 0 && setTags([]);
  };

  const filterJobListingsWithTags = () => {
    if (tags.length === 0) {
      return;
    }
    let filteredJoblistingsByTags = [];
    for (let i = 0; i < tags.length; i++) {
      for (let j = 0; j < jobListings.length; j++) {
        if (jobListings[j].skills) {
          if (!Array.isArray(jobListings[j].skills)) {
            continue;
          } else {
            for (let k = 0; k < jobListings[j].skills.length; k++) {
              const filterResultsArr = jobListings.filter((jobListing) => {
                if (jobListing.skills) {
                  return jobListing.skills[k] === tags[i];
                }
              });
              filteredJoblistingsByTags.push(...filterResultsArr);
            }
          }
        }
      }
    }
    console.log(filteredJoblistingsByTags);
    setJobListingsArr(
      filteredJoblistingsByTags.length !== 0
        ? [...new Set(filteredJoblistingsByTags)]
        : ["no result"]
    );
    searchInput !== "" && setSearchInput("");
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
          placeholder="キーワード検索"
          className="search-input"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          onKeyPress={(e) => e.key === "Enter" && filterJobListings()}
        />
        <Button
          variant="contained"
          className="submit-btn"
          onClick={() => filterJobListings()}
        >
          Submit
        </Button>
        <ChipInputAutosuggest
          data={skillsSuggestion}
          tags={tags}
          setTags={setTags}
          maxSuggestions={20}
          maxTags={10}
          maxInputLength={30}
          placeholder="スキルタグ検索"
          // onKeyPress={(e) => e.key === "Enter" && filterJobListingsWithTags()}
        />
        <Button
          variant="contained"
          className="submit-btn"
          onClick={() => filterJobListingsWithTags()}
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
