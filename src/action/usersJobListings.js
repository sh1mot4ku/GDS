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
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const addUsersJobListings = (jobListing) => ({
  type: "ADD_USERS_JOB_LISTING",
  jobListing,
});

export const startAddUsersJobListings = (jobId, postingInfo) => {
  return (dispatch, getState) => {
    const uid = getState().user.uid;

    return database
      .ref(`jobListings/${uid}/${jobId}`)
      .set(postingInfo)
      .then(() => {
        const postingInfoRedux = {
          ...postingInfo,
          id: jobId,
        };
        dispatch(addUsersJobListings(postingInfoRedux));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const editUsersJobListings = (jobListing) => ({
  type: "EDIT_USERS_JOB_LISTING",
  jobListing,
});

export const startEditUsersJobListings = (jobId, updates) => {
  return (dispatch, getState) => {
    const uid = getState().user.uid;

    return database
      .ref(`jobListings/${uid}/${jobId}`)
      .update(updates)
      .then(() => {
        const updatesRedux = {
          ...updates,
          id: jobId,
        };
        dispatch(editUsersJobListings(updatesRedux));
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
