import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobBox from './JobBox';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { startSetJobListings } from '../../action/jobListings';
import options from '../../data/radioButtonOptions/PostJobListings';
import './JobListings.scss';
import moment from 'moment';

const replaceLetters = (searchInput) =>
  searchInput.replace(/\s+/g, '').replace(/-/g, '').toLowerCase();

const JobListings = () => {
  const jobListings = useSelector((state) => state.jobListings);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [jobListingsArr, setJobListingsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { search } = useLocation();
  const history = useHistory();
  console.log(jobListingsArr);
  const params = new URLSearchParams(search);
  const searchKeywordQuery = params.get('search-keyword');
  const sortPostingDateQuery = params.get('sort-posting-date');
  const sortEmploymentTypeQuery = params.get('sort-employment-type');
  const hasSearchKeywordQuery = params.has('search-keyword');
  const hasSortPostingDateQuery = params.has('sort-posting-date');
  const hasSortEmploymentTypeQuery = params.has('sort-employment-type');

  const createSearchParamsForSearchKeyword = () => {
    if (hasSearchKeywordQuery) {
      params.set('search-keyword', searchInput);
    } else {
      params.append('search-keyword', searchInput);
    }
    history.push({
      search: params.toString(),
    });
  };

  const createSearchParamsForSortOptions = (e, hasQuery) => {
    const { value, name } = e.target;

    if (hasQuery) {
      params.set(name, value);
    } else {
      params.append(name, value);
    }
    if (value === '掲載日') {
      params.delete('sort-posting-date');
    } else if (value === '雇用形態') {
      params.delete('sort-employment-type');
    }
    history.push({
      search: params.toString(),
    });
  };

  const filterJobListings = () => {
    let totalfilteredJobListings = [];
    if (hasSearchKeywordQuery) {
      const searchKeywordsArr = searchKeywordQuery
        .toLowerCase()
        .replace(/　/g, ' ')
        .split(' ');
      console.log(searchKeywordsArr);

      jobListings.forEach((joblisting) => {
        let isAllMatched = [];
        const { jobTitle, companyName, employeeLocation, jobListing, tags } =
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
        if (!isAllMatched.includes(false))
          totalfilteredJobListings.push(joblisting);
      });
    } else if (hasSortPostingDateQuery) {
      const currentTimeAtUtc = moment().utc().valueOf();
      if (!hasSearchKeywordQuery) totalfilteredJobListings = jobListings;
      totalfilteredJobListings = totalfilteredJobListings.filter(
        (joblisting) =>
          currentTimeAtUtc - joblisting.postedTimeStamp <= sortPostingDateQuery
      );
    } else if (hasSortEmploymentTypeQuery) {
      if (!hasSearchKeywordQuery && !hasSortPostingDateQuery)
        totalfilteredJobListings = jobListings;
      totalfilteredJobListings = totalfilteredJobListings.filter(
        (joblisting) => joblisting.employmentType === sortEmploymentTypeQuery
      );
    }
    setJobListingsArr(
      totalfilteredJobListings.length !== 0
        ? totalfilteredJobListings
        : ['no result']
    );
  };

  const filterJobListingsHandler = () => {
    if (
      hasSearchKeywordQuery ||
      hasSortEmploymentTypeQuery ||
      hasSortPostingDateQuery
    ) {
      filterJobListings();
    }
  };

  useEffect(() => {
    if (jobListings.length !== 0 || loaded) {
      setJobListingsArr(jobListings);
      !loaded && setLoaded(true);
    } else if (jobListings.length === 0) {
      dispatch(startSetJobListings());
      setLoaded(true);
    }
    filterJobListingsHandler();
  }, [jobListings]);

  useEffect(() => {
    filterJobListingsHandler();
  }, [search]);

  return (
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
              e.key === 'Enter' && createSearchParamsForSearchKeyword(e)
            }
          />
          <SearchIcon
            className="search-icon"
            onClick={createSearchParamsForSearchKeyword}
          />
        </div>
        <div className="sort-wrap">
          <select
            name="sort-posting-date"
            id="sort-posting-date"
            className="sort-dropdown"
            value={sortPostingDateQuery || '掲載日'}
            onChange={(e) =>
              createSearchParamsForSortOptions(e, hasSortPostingDateQuery)
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
            value={sortEmploymentTypeQuery || '雇用形態'}
            onChange={(e) =>
              createSearchParamsForSortOptions(e, hasSortEmploymentTypeQuery)
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
