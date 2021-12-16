import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobBox from "./JobBox";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { startSetJobListings } from "../../action/jobListings";
import options from "../../data/radioButtonOptions/PostJobListings";
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
  const [loaded, setLoaded] = useState(false);
  console.log(jobListingsArr);

  const filterJobListings2 = () => {
    let totalfilteredJobListings = [];
    if (searchInput.length === 0) {
      setJobListingsArr(jobListings);
    }
    let convertSearchInput = searchInput;
    let searchKeywordsArr =
      replaceLettersAndCreateKeywordsArr(convertSearchInput);

    jobListings.forEach((joblisting) => {
      let isAllMatched = [];
      searchKeywordsArr.forEach((searchKeyword) => {
        const { jobTitle, companyName, employeeLocation, jobListing, tags } =
          joblisting;
        if (
          replaceLetters(jobTitle).includes(searchKeyword) ||
          replaceLetters(companyName).includes(searchKeyword) ||
          replaceLetters(employeeLocation).includes(searchKeyword) ||
          replaceLetters(jobListing).includes(searchKeyword) ||
          // tags.find(searchKeyword) !== undefined
          tags.map((tag) => replaceLetters(tag)).includes(searchKeyword)
        ) {
          isAllMatched.push(true);
        } else {
          isAllMatched.push(false);
        }
      });
      if (!isAllMatched.includes(false)) {
        totalfilteredJobListings.push(joblisting);
      }
    });
    setJobListingsArr(
      totalfilteredJobListings.length !== 0
        ? totalfilteredJobListings
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
      <div className="search-sort-container">
        <div className="search-input-wrap">
          <input
            type="text"
            placeholder="タイトル、会社名、勤務地、スキルなど"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className="search-input"
            onKeyPress={(e) => e.key === "Enter" && filterJobListings2()}
          />
          <SearchIcon
            className="search-icon"
            onClick={() => filterJobListings2()}
          />
        </div>
        <div className="sort-wrap">
          <select
            name="day-of-posting"
            id="day-of-posting"
            className="sort-dropdown"
          >
            <option value="掲載日">掲載日</option>
            <option value="24時間以内">24時間以内</option>
            <option value="7日以内">7日以内</option>
            <option value="１ヶ月以内">１ヶ月以内</option>
          </select>
          <select
            name="contract-type"
            id="contract-type"
            className="sort-dropdown"
          >
            <option value="雇用形態">雇用形態</option>
            {options.length !== 0 &&
              options.map((option) => <option value={option}>{option}</option>)}
          </select>
        </div>
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
