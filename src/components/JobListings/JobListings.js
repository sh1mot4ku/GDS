import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobBox from "./JobBox";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import ChipInputAutosuggest from "../ui/SkillInput";
import skillsSuggestion from "../../data/skills/integration";
import { startSetJobListings } from "../../action/jobListings";
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
  const jobListings = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [jobListingsArr, setJobListingsArr] = useState([]);
  const [tags, setTags] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const filterJobListings = () => {
    console.log("filter func");
    let totalfilteredJobListings = [];
    if (searchInput.length !== 0) {
      let convertSearchInput = searchInput;
      let searchKeywordsArr =
        replaceLettersAndCreateKeywordsArr(convertSearchInput);
      let filteredJoblistingsbyTitles;
      let filteredJoblistingsbyDescriptions;
      let filteredJoblistingsbyCompanyName;
      let filteredJoblistingsbyPlace;
      for (let i = 0; i < searchKeywordsArr.length; i++) {
        filteredJoblistingsbyTitles = jobListings.filter((jobListing) => {
          if (jobListing.jobTitle) {
            return (
              replaceLetters(jobListing.jobTitle).search(
                searchKeywordsArr[i]
              ) !== -1
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
        filteredJoblistingsbyCompanyName = jobListings.filter((jobListing) => {
          if (jobListing.companyName) {
            return (
              replaceLetters(jobListing.companyName).search(
                searchKeywordsArr[i]
              ) !== -1
            );
          }
        });
        filteredJoblistingsbyPlace = jobListings.filter((jobListing) => {
          if (jobListing.companyAddress) {
            return (
              replaceLetters(jobListing.companyAddress).search(
                searchKeywordsArr[i]
              ) !== -1
            );
          }
        });
        totalfilteredJobListings.push(
          ...filteredJoblistingsbyTitles,
          ...filteredJoblistingsbyDescriptions,
          ...filteredJoblistingsbyCompanyName,
          ...filteredJoblistingsbyPlace
        );
      }
    }

    if (tags.length !== 0) {
      for (let i = 0; i < tags.length; i++) {
        for (let j = 0; j < jobListings.length; j++) {
          if (jobListings[j].tags) {
            if (!Array.isArray(jobListings[j].tags)) {
              continue;
            } else {
              for (let k = 0; k < jobListings[j].tags.length; k++) {
                const filterResultsArr = jobListings.filter((jobListing) => {
                  if (jobListing.tags) {
                    return jobListing.tags[k] === tags[i];
                  }
                });
                totalfilteredJobListings.push(...filterResultsArr);
              }
            }
          }
        }
      }
    }
    setJobListingsArr(
      totalfilteredJobListings.length !== 0
        ? [...new Set(totalfilteredJobListings)]
        : ["no result"]
    );
  };

  useEffect(() => {
    if (jobListings.length !== 0 || loaded) {
      setJobListingsArr(jobListings);
      !loaded && setLoaded(true);
    } else if (jobListings.length === 0) {
      dispatch(startSetJobListings());
      setLoaded(true);
    }
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
        <ChipInputAutosuggest
          data={skillsSuggestion}
          tags={tags}
          setTags={setTags}
          maxSuggestions={20}
          maxTags={10}
          maxInputLength={30}
          placeholder="スキルタグ検索"
        />
        <button
          variant="contained"
          className="submit-btn"
          onClick={() => filterJobListings()}
        >
          検索
        </button>
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
          <div>Loading...</div> // add loaading animation here
        )}
      </div>
    </>
  );
};

export default JobListings;
