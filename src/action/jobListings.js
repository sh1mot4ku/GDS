import database from "../firebase/firebase";

export const setJobListings = (jobListings) => ({
  type: "SET_JOB_LISTINGS",
  jobListings,
});

export const startSetJobListings = () => {
  return (dispatch) => {
    return database
      .ref(`/jobListings`)
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
      });
  };
};

export const addJobInfo = (jobinfo) => ({
  type: "ADD_JOB_INFO",
  jobinfo,
});
