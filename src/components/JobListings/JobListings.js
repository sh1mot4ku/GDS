import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobBox from './JobBox';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { startSetJobListings } from '../../action/jobListings';
import options from '../../data/radioButtonOptions/PostJobListings';
import './JobListings.scss';

const replaceLetters = (searchInput) =>
  searchInput.replace(/\s+/g, '').replace(/-/g, '').toLowerCase();

const JobListings = () => {
  const jobListings = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [jobListingsArr, setJobListingsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { pathname, search } = useLocation();
  const history = useHistory();
  console.log(jobListingsArr);
  console.log(search);
  // console.log(pathname);

  const params = new URLSearchParams(search);
  const searchKeywordQuery = params.get('search-keyword');
  const sortByPostingDateQuery = params.get('sort-posting-date');
  const sortByContractTypeQuery = params.get('sort-contract-type');
  const hasSearchKeywordQuery = params.has('search-keyword');
  const hasByPostingDateQuery = params.has('sort-posting-date');
  const hasortByContractTypeQuery = params.has('sort-contract-type');
  console.log(params.toString());

  const createSearchParamsForSearchKeyword = () => {
    console.log(searchInput);
    // history.push({
    //   search: `${
    //     hasByPostingDateQuery || hasortByContractTypeQuery ? '&' : '?'
    //   }search-keyword=${searchInput}`,
    // });
    if (params.toString().length !== 0)
      params.append('search-keyword', searchInput);

    history.push({
      search:
        params.toString().length !== 0
          ? params.toString()
          : `?search-keyword=${searchInput}`,
    });
  };

  const createSearchParamsForSortPostingDate = (e) => {
    // history.push({
    //   search: `${
    //     hasSearchKeywordQuery || hasortByContractTypeQuery ? '&' : '?'
    //   }sort-posting-date=${e.target.value}`,
    // });
    if (params.toString().length !== 0)
      params.append('sort-posting-date', e.target.value);

    history.push({
      search:
        params.toString().length !== 0
          ? params.toString()
          : `?sort-posting-date=${e.target.value}`,
    });
  };

  const createSearchParamsForContractType = (e) => {
    if (params.toString().length !== 0)
      params.append('sort-contract-type', e.target.value);

    history.push({
      search:
        params.toString().length !== 0
          ? params.toString()
          : `?sort-contract-type=${e.target.value}`,
    });
  };

  const filterJobListings = () => {
    console.log('filterJobListings');
    if (searchInput.length === 0) setJobListingsArr(jobListings);
    if (hasSearchKeywordQuery) {
      const searchKeywordsArr = searchKeywordQuery
        .toLowerCase()
        .replace(/　/g, ' ')
        .split(' ');
      console.log(searchKeywordsArr);

      let totalfilteredJobListings = [];

      jobListings.forEach((joblisting) => {
        let isAllMatched = [];
        const {
          jobTitle,
          companyName,
          employeeLocation,
          jobListing,
          tags,
          id,
        } = joblisting;
        searchKeywordsArr.forEach((searchKeyword) => {
          if (
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
        if (!isAllMatched.includes(false)) {
          // avoid duplicate
          // !totalfilteredJobListings.some(
          //   (filteredJobListing) => filteredJobListing.id === id
          // ) &&
          totalfilteredJobListings.push(joblisting);
        }
      });
      setJobListingsArr(
        totalfilteredJobListings.length !== 0
          ? totalfilteredJobListings
          : ['no result']
      );
    }
  };

  const sortByPostingDate = () => {
    let sortedJobListingsByPostingDate = [];
    sortedJobListingsByPostingDate = jobListingsArr.filter((joblisting) => {
      const { employmentType } = joblisting;
      if (employmentType) {
        return employmentType === sortByPostingDateQuery;
      }
    });
    setJobListingsArr(
      sortedJobListingsByPostingDate.length !== 0
        ? sortedJobListingsByPostingDate
        : ['no result']
    );
    console.log('sortbypostingdate');
  };

  const sortByContractType = () => {
    console.log(sortByContractTypeQuery);
    let sortedJobListingsByContractType = [];
    sortedJobListingsByContractType = jobListingsArr.filter(
      (joblisting) =>
        // {
        //   const { employmentType } = joblisting;
        //   console.log(employmentType);
        //   return employmentType && employmentType === sortByContractTypeQuery;
        // }
        joblisting.employmentType === sortByContractTypeQuery
    );
    console.log(sortedJobListingsByContractType);
    setJobListingsArr(
      sortedJobListingsByContractType.length !== 0
        ? sortedJobListingsByContractType
        : ['no result']
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

    hasSearchKeywordQuery && filterJobListings();
    hasByPostingDateQuery && sortByPostingDate();
    hasortByContractTypeQuery && sortByContractType();
  }, [jobListings, search]);

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
            // onKeyPress={(e) => e.key === 'Enter' && filterJobListings()}
            onKeyPress={(e) =>
              e.key === 'Enter' && createSearchParamsForSearchKeyword()
            }
          />
          {/* <SearchIcon className="search-icon" onClick={filterJobListings} /> */}
          <SearchIcon
            className="search-icon"
            onClick={createSearchParamsForSearchKeyword}
          />
        </div>
        <div className="sort-wrap">
          <select
            name="day-of-posting"
            id="day-of-posting"
            className="sort-dropdown"
            onChange={createSearchParamsForSortPostingDate}
          >
            <option value="掲載日">掲載日</option>
            <option value="1日以内">1日以内</option>
            <option value="7日以内">7日以内</option>
            <option value="１ヶ月以内">１ヶ月以内</option>
          </select>
          <select
            name="contract-type"
            id="contract-type"
            className="sort-dropdown"
            onChange={createSearchParamsForContractType}
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
      <div className="joblisting-wrapper">
        {jobListingsArr[0] === 'no result' ? (
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
