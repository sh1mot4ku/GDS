import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobBox from "./JobBox";
import { startSetUsersJobListings } from "../../action/usersJobListings";
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
      console.log(
        "Dispatch startSetUsersJobListings from JobListingsManagement"
      );
      setLoaded(true);
    }
  }, [usersJobListings]);

  return (
    <div className="users-joblistings-wrapper">
      <h2 className="users-joblistings-header">求人一覧</h2>
      {/* I changed here since the default state is now null, pls check if everything works ok */}
      {jobListingsArr === null ? (
        <div>Loading...</div> // Change here to loading animation
      ) : jobListingsArr.length !== 0 && loaded ? (
        jobListingsArr.map((job) => (
          <React.Fragment key={job.id}>
            <JobBox {...job} />
          </React.Fragment>
        ))
      ) : (
        <div>求人投稿はまだありません</div>
      )}
    </div>
  );
};

export default JobListingsManagement;
