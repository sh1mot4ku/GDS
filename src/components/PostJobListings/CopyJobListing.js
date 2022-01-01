import React from "react";
import { v4 as uuid } from "uuid";
import EditJobListing from "./EditJobListing";

const CopyJobListing = () => {
  const copyId = uuid();
  return (
    <div>
      <EditJobListing copyId={copyId} copy />
    </div>
  );
};

export default CopyJobListing;
