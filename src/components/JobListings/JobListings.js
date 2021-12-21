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
  console.log(pathname);

  const params = new URLSearchParams(search);
  const searchKeywordQuery = params.get('search-keyword');
  const sortByPostingDateQuery = params.get('sort-posting-date');
  const sortByContractTypeQuery = params.get('sort-contract-type');
  const hasSearchKeywordQuery = params.has('search-keyword');
  const hasByPostingDateQuery = params.has('sort-posting-date');
  const HasortByContractTypeQuery = params.has('sort-contract-type');
  console.log(hasSearchKeywordQuery);

  const createSearchParams = () => {
    console.log(searchInput);
    history.push({
      search: `${
        hasByPostingDateQuery || HasortByContractTypeQuery ? '&' : '?'
      }search-keyword=${searchInput}`,
    });
  };

  const filterJobListings = () => {
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

  const sortByPostingDate = (e) => {
    let sortedJobListingsByPostingDate = [];

    console.log('sortbypostingdate');
  };

  const sortByContractType = (e) => {
    // e.preventDefault();
    console.log('sortbycontract' + e.target.value);
  };

  useEffect(() => {
    if (jobListings.length !== 0 || loaded) {
      setJobListingsArr(jobListings);
      !loaded && setLoaded(true);
    } else if (jobListings.length === 0) {
      dispatch(startSetJobListings());
      setLoaded(true);
    }

    hasSearchKeywordQuery !== 0 && filterJobListings();
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
            onKeyPress={(e) => e.key === 'Enter' && createSearchParams()}
          />
          {/* <SearchIcon className="search-icon" onClick={filterJobListings} /> */}
          <SearchIcon className="search-icon" onClick={createSearchParams} />
        </div>
        <div className="sort-wrap">
          <select
            name="day-of-posting"
            id="day-of-posting"
            className="sort-dropdown"
            onChange={sortByPostingDate}
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
            onChange={sortByContractType}
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
