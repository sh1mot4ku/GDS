import React, { useEffect, useState } from "react";
import PostJobListings from "./PostJobListings";
import { useParams } from "react-router-dom";
import { setFullJobListing } from "../../API/dbutils";

const EditJobListing = () => {
  const { jobId } = useParams();
  const [usersJobListing, setUsersJobListing] = useState(null);

  useEffect(async () => {
    if (jobId) {
      const snapshot = await setFullJobListing(jobId);
      setUsersJobListing({
        ...snapshot.val(),
        id: jobId,
      });
    }
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
