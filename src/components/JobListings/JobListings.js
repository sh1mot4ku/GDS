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

const replaceLettersAndCreateKeywordsArr = (searchInput) => {
  let keywordsArr = searchInput.toLowerCase().replace(/　/g, ' ').split(' ');
  // let params = '';
  // keywordsArr.forEach((keyword) => {
  //   history.push(params + keyword);
  // });

  // console.log(keywordsArr);
  return keywordsArr;
};

const JobListings = () => {
  const jobListings = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [jobListingsArr, setJobListingsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const search = useLocation().search;
  const history = useHistory();
  console.log(search);

  const params = new URLSearchParams(search);
  const searchKeywordQuery = params.get('search-keyword');
  const sortByPostingDateQuery = params.get('sort-posting-date');
  const sortByContractTypeQuery = params.get('sort-contract-type');
  const hasSearchKeyword = params.has('search-keyword');
  console.log(hasSearchKeyword);

  // const replaceLettersAndCreateKeywordsArr = (searchInput) => {
  //   history.push({
  //     // pathname: '/joblistings',
  //     search: `?search-keyword=${searchInput}`,
  //   });
  //   if (hasSearchKeyword) {
  //     console.log('hasSearchKeyword');
  //     let keywordsArr = params
  //       .get('search-keyword')
  //       .toLowerCase()
  //       .replace(/　/g, ' ')
  //       .split(' ');
  //     // searchInput.toLowerCase().replace(/　/g, ' ').split(' ');
  //     console.log(keywordsArr);
  //     return keywordsArr;
  //   }
  //   return [];
  // };

  const filterJobListings = () => {
    if (searchInput.length === 0) setJobListingsArr(jobListings);

    let totalfilteredJobListings = [];
    let searchKeywordsArr = replaceLettersAndCreateKeywordsArr(searchInput);

    jobListings.forEach((joblisting) => {
      let isAllMatched = [];
      const { jobTitle, companyName, employeeLocation, jobListing, tags, id } =
        joblisting;
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
        !totalfilteredJobListings.some(
          (filteredJobListing) => filteredJobListing.id === id
        ) && totalfilteredJobListings.push(joblisting);
      }
    });
    setJobListingsArr(
      totalfilteredJobListings.length !== 0
        ? totalfilteredJobListings
        : ['no result']
    );
  };

  const sortByPostingDate = (e) => {
    // e.preventDefault();
    console.log('sortbypostingdate');
  };

  const sortByContractType = (e) => {
    // e.preventDefault();
    console.log('sortbycontract');
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
            onKeyPress={(e) => e.key === 'Enter' && filterJobListings()}
          />
          <SearchIcon className="search-icon" onClick={filterJobListings} />
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
