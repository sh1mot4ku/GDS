import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./EditJobListing.scss";
import PostJobListings from "./PostJobListings";
import { useParams } from "react-router-dom";

const EditJobListing = () => {
  const { jobId } = useParams();
  const usersJobListings = useSelector((state) => state.usersJobListings);
  const [usersJobListing, setUsersJobListing] = useState(null);

  useEffect(() => {
    const job = usersJobListings.find((jobListing) => jobListing.id === jobId);
    setUsersJobListing(job);
  }, [jobId]);

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
