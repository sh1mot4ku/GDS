import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobBox from "./JobBox";
import { startSetUsersJobListings } from "../../action/usersJobListings";
import "./JobListingsManagement.scss";

const JobListingsManagement = () => {
  const usersJobListings = useSelector((state) => state.usersJobListings);
  const dispatch = useDispatch();
  const [jobListingsArr, setJobListingsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (usersJobListings.length !== 0) {
      setJobListingsArr(usersJobListings);
    } else if (usersJobListings.length === 0) {
      // if there are not any users' joblistings information, fetch them from db
      dispatch(startSetUsersJobListings());
      console.log(
        "Dispatch startSetUsersJobListings from JobListingsManagement"
      );
      setLoaded(true);
    }
  }, [usersJobListings]);

  return (
    <div className="users-joblistings-wrapper">
      <h2 className="users-joblistings-header">求人一覧</h2>
      {(jobListingsArr.length !== 0) & loaded ? (
        jobListingsArr.map((job) => (
          <React.Fragment key={job.id}>
            <JobBox {...job} />
          </React.Fragment>
        ))
      ) : (jobListingsArr.length === 0) & loaded ? (
        <div>求人投稿はまだありません</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobListingsManagement;
