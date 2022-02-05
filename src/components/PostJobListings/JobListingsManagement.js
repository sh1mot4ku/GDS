import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobBox from "./JobBox";
import { startSetUsersJobListings } from "../../action/usersJobListings";
import Loading from "../ui/Loading";
import "./JobListingsManagement.scss";

const JobListingsManagement = () => {
  const usersJobListings = useSelector((state) => state.usersJobListings);
  const dispatch = useDispatch();
  const [jobListingsArr, setJobListingsArr] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    /* I changed here since the default state is now null, pls check if everything works ok */
    if (usersJobListings || loaded) {
      setJobListingsArr(usersJobListings);
      !loaded && setLoaded(true);
    } else if (usersJobListings === null) {
      // if there are not any users' joblistings information, fetch them from db
      dispatch(startSetUsersJobListings());
    }
    setLoaded(true);
  }, [usersJobListings]);

  return (
    <div className="users-joblistings-wrapper">
      <h2 className="users-joblistings-header">求人一覧</h2>
      {/* I changed here since the default state is now null, pls check if everything works ok */}
      {jobListingsArr === null ? (
        <Loading />
      ) : jobListingsArr.length !== 0 && loaded ? (
        jobListingsArr.map((job) => (
          <React.Fragment key={job.id}>
            <JobBox {...job} />
          </React.Fragment>
        ))
      ) : (
        <div className="no-result-wrapper">
          <span>求人がまだありません</span>
        </div>
      )}
    </div>
  );
};

export default JobListingsManagement;
