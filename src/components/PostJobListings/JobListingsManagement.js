import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsersJobListings } from "../../action/usersJobListings";
import JobBox from "./JobBox";
import database from "../../firebase/firebase";
import "./JobListingsManagement.scss";

const JobListingsManagement = () => {
  const { uid } = useSelector((state) => state.user);
  const usersJobListings = useSelector((state) => state.usersJobListings);
  const dispatch = useDispatch();
  const [jobListingsArr, setJobListingsArr] = useState([]);

  useEffect(() => {
    if (uid) {
      database
        .ref(`jobListings/${uid}`)
        .once("value")
        .then((snapshot) => {
          const usersJobListingsArray = [];
          snapshot.forEach((childSnapShot) => {
            usersJobListingsArray.push({
              id: childSnapShot.key,
              ...childSnapShot.val(),
            });
          });
          dispatch(setUsersJobListings(usersJobListingsArray));
        });
    }
  }, [uid]);

  useEffect(() => {
    usersJobListings && setJobListingsArr(usersJobListings);
  }, [usersJobListings]);

  return (
    <div className="users-joblistings-wrapper">
      {jobListingsArr.length !== 0 ? (
        jobListingsArr.map((job) => (
          <React.Fragment key={job.id}>
            <JobBox {...job} />
          </React.Fragment>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobListingsManagement;
