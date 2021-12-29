import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobBox from "./JobBox";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useHistory } from "react-router-dom";
import { startSetJobListings } from "../../action/jobListings";
import options from "../../data/radioButtonOptions/PostJobListings";
import "./JobListings.scss";
import moment from "moment";
import Loading from "../ui/Loading";
import { Pagination } from "@mui/material";

// replace letters to lowercase, remove space and dash
const replaceLetters = (searchInput) =>
  searchInput.replace(/\s+/g, "").replace(/-/g, "").toLowerCase();
// create search keyword arr
const createSearchKeywordsArr = (searchKeywordQuery) =>
  searchKeywordQuery.toLowerCase().replace(/　/g, " ").split(" ");

const JobListings = () => {
  const { search } = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(search);
  const searchKeywordQuery = params.get("search-keyword");
  const sortPostingDateQuery = params.get("sort-posting-date");
  const sortEmploymentTypeQuery = params.get("sort-employment-type");
  const hasSearchKeywordQuery = params.has("search-keyword");
  const hasSortPostingDateQuery = params.has("sort-posting-date");
  const hasSortEmploymentTypeQuery = params.has("sort-employment-type");
  const jobListings = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(
    searchKeywordQuery ? searchKeywordQuery : ""
  );
  const [jobListingsArr, setJobListingsArr] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [joblistingsCount, setJoblistingsCount] = useState(10);
  const [page, setPage] = useState(1);
  const [numOfJoblistingsResult, setNumOfJoblistingsResult] = useState(0);
  console.log(`page ${page}`);

  // handle pagenation
  const onHandlePage = (_, val) => {
    window.scroll(0, 0);
    setPage(val);
  };

  // params will be changed and the useEffect gets executed to run filterJobListings()
  const onHandleSearchParamsForSearchKeyword = () => {
    if (hasSearchKeywordQuery) {
      params.set("search-keyword", searchInput);
    } else {
      params.append("search-keyword", searchInput);
    }
    history.push({
      search: params.toString(),
    });
  };

  // params will be changed and the useEffect gets executed to run filterJobListings()
  const onHandleSearchParamsForSortOptions = (e, hasQuery) => {
    const { value, name } = e.target;

    if (hasQuery) {
      params.set(name, value);
    } else {
      params.append(name, value);
    }
    if (value === "掲載日") {
      params.delete("sort-posting-date");
    } else if (value === "雇用形態") {
      params.delete("sort-employment-type");
    }
    history.push({
      search: params.toString(),
    });
  };

  const filterJobListings = () => {
    let totalfilteredJobListings = [];
    // ================= filter func for search input ===================
    if (hasSearchKeywordQuery) {
      const searchKeywordsArr = createSearchKeywordsArr(searchKeywordQuery);
      console.log(searchKeywordsArr);

      jobListings.forEach((joblisting) => {
        let isAllMatched = [];
        const { jobTitle, companyName, employeeLocation, jobListing, tags } =
          joblisting;
        searchKeywordsArr.forEach((searchKeyword) => {
          if (
            // see if each joblisting is matched with all of the search keywords (& search)
            replaceLetters(jobTitle).includes(searchKeyword) ||
            replaceLetters(companyName).includes(searchKeyword) ||
            replaceLetters(employeeLocation).includes(searchKeyword) ||
            replaceLetters(jobListing).includes(searchKeyword) ||
            tags.map((tag) => replaceLetters(tag)).includes(searchKeyword)
          ) {
            isAllMatched.push(true);
          } else {
            isAllMatched.push(false);
          }
        });
        // if false includes the joblisting is not matched with & search
        if (!isAllMatched.includes(false))
          totalfilteredJobListings.push(joblisting);
      });
    }
    // ================= filter func for posting date sort (掲載日) ===================
    if (hasSortPostingDateQuery) {
      const currentTimeAtUtc = moment().utc().valueOf();
      // if there is no search keyword query set, then we want to sort from jobListings
      if (!hasSearchKeywordQuery) totalfilteredJobListings = jobListings;
      totalfilteredJobListings = totalfilteredJobListings.filter(
        (joblisting) =>
          currentTimeAtUtc - joblisting.postedTimeStamp <= sortPostingDateQuery
      );
    }
    // ================= filter func for employment type sort (雇用形態) ===================
    if (hasSortEmploymentTypeQuery) {
      // if there are no search keyword and posting date query set, then we want to sort from jobListings
      if (!hasSearchKeywordQuery && !hasSortPostingDateQuery)
        totalfilteredJobListings = jobListings;
      totalfilteredJobListings = totalfilteredJobListings.filter(
        (joblisting) => joblisting.employmentType === sortEmploymentTypeQuery
      );
    }
    // =========== then set result(totalfilteredJobListings) to setJobListingsArr() =============
    setNumOfJoblistingsResult(totalfilteredJobListings.length);
    if (totalfilteredJobListings.length !== 0) {
      const jobListingsOnAPage = totalfilteredJobListings.slice(
        joblistingsCount * page - 10,
        joblistingsCount * page
      );
      setJobListingsArr(jobListingsOnAPage);
    } else {
      setJobListingsArr(["no result"]);
    }
  };

  useEffect(() => {
    console.log("in useeffect");
    if (jobListings || loaded) {
      console.log("in useeffect");
      setNumOfJoblistingsResult(jobListings.length);
      const jobListingsOnAPage = jobListings.slice(
        joblistingsCount * page - 10,
        joblistingsCount * page
      );
      // console.log(
      //   jobListingsOnAPage,
      //   joblistingsCount * page - 10,
      //   joblistingsCount * page
      // );
      setJobListingsArr(jobListingsOnAPage);
      !loaded && setLoaded(true);
    } else if (jobListings === null) {
      dispatch(startSetJobListings());
      setLoaded(true);
    }
    if (jobListings) {
      if (
        hasSearchKeywordQuery ||
        hasSortEmploymentTypeQuery ||
        hasSortPostingDateQuery
      ) {
        filterJobListings();
      }
    }
  }, [jobListings, search, page]);

  return (
    <>
      {jobListingsArr === null ? (
        <Loading />
      ) : (
        <>
          <div className="search-sort-container">
            <div className="search-input-wrap">
              <input
                type="text"
                placeholder="タイトル、会社名、勤務地、スキルなど"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                name="search-input"
                className="search-input"
                onKeyPress={(e) =>
                  e.key === "Enter" && onHandleSearchParamsForSearchKeyword(e)
                }
              />
              <div className="icons-wrapper">
                <CloseIcon
                  className={[
                    "close-icon",
                    searchInput === "" && "display-none",
                  ].join(" ")}
                  onClick={() => setSearchInput("")}
                />
                <SearchIcon
                  className="search-icon"
                  onClick={onHandleSearchParamsForSearchKeyword}
                />
              </div>
            </div>
            <div className="sort-wrap">
              <select
                name="sort-posting-date"
                id="sort-posting-date"
                className="sort-dropdown"
                value={sortPostingDateQuery || "掲載日"}
                onChange={(e) =>
                  onHandleSearchParamsForSortOptions(e, hasSortPostingDateQuery)
                }
              >
                <option value="掲載日">掲載日</option>
                <option value="86400000">1日以内</option>
                <option value="604800000">7日以内</option>
                <option value="2592000000">１ヶ月以内</option>
              </select>
              <select
                name="sort-employment-type"
                id="sort-employment-type"
                className="sort-dropdown"
                value={sortEmploymentTypeQuery || "雇用形態"}
                onChange={(e) =>
                  onHandleSearchParamsForSortOptions(
                    e,
                    hasSortEmploymentTypeQuery
                  )
                }
              >
                <option value="雇用形態">雇用形態</option>
                {options.length !== 0 &&
                  options.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {jobListingsArr.length !== 0 ? (
            <>
              <div className="joblisting-wrapper">
                {jobListingsArr[0] === "no result" ? (
                  <>
                    <p className="no-result-text">
                      {searchKeywordQuery && searchKeywordQuery + "に"}
                      一致する求人は見つかりませんでした
                    </p>
                  </>
                ) : (
                  jobListingsArr.map((job) => (
                    <React.Fragment key={job.id}>
                      <JobBox {...job} />
                    </React.Fragment>
                  ))
                )}
                <div className="pagenation-wrapper">
                  <Pagination
                    count={
                      numOfJoblistingsResult % 10 === 0
                        ? numOfJoblistingsResult / 10
                        : Math.ceil(numOfJoblistingsResult / 10)
                    }
                    page={page}
                    color="primary"
                    onChange={onHandlePage}
                  />
                </div>
              </div>
              ;
            </>
          ) : (
            <div className="no-joblisting-wrapper">
              <p className="no-joblisting-text">求人がまだありません</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default JobListings;
