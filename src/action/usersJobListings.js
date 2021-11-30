import database from "../firebase/firebase";

export const setUsersJobListings = (jobListings) => ({
  type: "SET_USERS_JOB_LISTINGS",
  jobListings,
});

export const startSetUsersJobListings = () => {
  return (dispatch, getState) => {
    const uid = getState().user.uid;

    return database
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
  };
};
export const addUsersJobListings = (jobListing) => ({
  type: "ADD_USERS_JOB_LISTING",
  jobListing,
});
export const editUsersJobListings = (jobListing) => ({
  type: "EDIT_USERS_JOB_LISTING",
  jobListing,
});
