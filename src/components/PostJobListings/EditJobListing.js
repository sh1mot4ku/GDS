import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostJobListings from "./PostJobListings";
import { useParams } from "react-router-dom";
import { startSetUsersJobListings } from "../../action/usersJobListings";

const EditJobListing = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const usersJobListings = useSelector((state) => state.usersJobListings);
  const [usersJobListing, setUsersJobListing] = useState(null);

  useEffect(() => {
    if (jobId && usersJobListings.length !== 0) {
      const job = usersJobListings.find(
        (jobListing) => jobListing.id === jobId
      );
      setUsersJobListing(job);
    } else if (usersJobListings.length === 0) {
      // if there are not any users' joblistings information, fetch them from db
      dispatch(startSetUsersJobListings());
      console.log("Dispatch startSetUsersJobListings from EditJobListing");
    }
  }, [jobId, usersJobListings]);

  return (
    <div>
      {usersJobListing ? (
        <PostJobListings {...usersJobListing} edit />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditJobListing;
