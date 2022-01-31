import React, { useEffect, useState } from "react";
import PostJobListings from "./PostJobListings";
import { useParams } from "react-router-dom";
import { setFullJobListing } from "../../API/dbutils";

const EditJobListing = ({ copyId = null, copy = false }) => {
  const { jobId } = useParams();
  const [usersJobListing, setUsersJobListing] = useState(null);

  const setFullJobListingToJob = async () => {
    if (jobId) {
      const snapshot = await setFullJobListing(jobId);
      setUsersJobListing({
        ...snapshot.val(),
        id: copyId || jobId, // if user want to copy job listings, set id as ID for copying
      });
    }
  };

  useEffect(() => {
    setFullJobListingToJob();
  }, [jobId]);

  return (
    <div>
      {usersJobListing ? (
        <PostJobListings {...usersJobListing} edit={!copy} copy={copy} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditJobListing;
