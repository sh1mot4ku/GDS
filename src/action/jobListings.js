import database from "../firebase/firebase";

export const setJobListings = (jobListings) => ({
  type: "SET_JOB_LISTINGS",
  jobListings,
});

export const startSetJobListings = () => {
  return (dispatch) => {
    return database
      .ref(`/shortJobListings`)
      .once("value")
      .then((snapshot) => {
        const jobListingsArray = [];
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((grandChildSnapshot) => {
            jobListingsArray.push({
              id: grandChildSnapshot.key,
              ...grandChildSnapshot.val(),
            });
          });
        });
        dispatch(setJobListings(jobListingsArray));
        console.log("startSetJobListings finished");
      });
  };
};

export const addJobListing = (jobListing) => ({
  type: "ADD_JOB_LISTING",
  jobListing,
});
export const editJobListing = (jobListing) => ({
  type: "EDIT_JOB_LISTING",
  jobListing,
});
export const deleteJobListing = (id) => ({
  type: "DELETE_JOB_LISTING",
  id,
});
