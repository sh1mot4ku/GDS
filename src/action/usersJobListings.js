import database from "../firebase/firebase";
import {
  addJobListing,
  editJobListing,
  deleteJobListing,
} from "../action/jobListings";

export const setUsersJobListings = (jobListings) => ({
  type: "SET_USERS_JOB_LISTINGS",
  jobListings,
});

export const startSetUsersJobListings = () => {
  return (dispatch, getState) => {
    const uid = getState().user.uid;

    return database
      .ref(`shortJobListings/${uid}`)
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
        console.log("startSetUsersJobListings finished");
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

export const startAddUsersJobListings = (
  jobId,
  shortPostingInfo,
  fullPostingInfo
) => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;

    try {
      // set short posting information to database
      await database
        .ref(`shortJobListings/${uid}/${jobId}`)
        .set(shortPostingInfo);
      console.log("set short posting information to database");

      // set full posting information to database
      await database.ref(`fullJobListings/${jobId}`).set(fullPostingInfo);
      console.log("set full posting information to database");

      // set posting ID under this user's node to set security rules for editing posting information
      await database.ref(`user/${uid}/jobListings/${jobId}`).set(true);
      console.log(
        "set posting ID under this user's node to set security rules for editing posting information"
      );

      // save short posting information to Redux
      const shortPostingInfoRedux = {
        ...shortPostingInfo,
        id: jobId,
      };
      dispatch(addUsersJobListings(shortPostingInfoRedux));
      dispatch(addJobListing(shortPostingInfoRedux));

      console.log("startSetUsersJobListings finished");
    } catch (err) {
      throw err;
    }
  };
};

export const editUsersJobListings = (jobListing) => ({
  type: "EDIT_USERS_JOB_LISTING",
  jobListing,
});

export const startEditUsersJobListings = (jobId, shortUpdates, fullUpdates) => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;

    try {
      // update short posting information to database
      await database
        .ref(`shortJobListings/${uid}/${jobId}`)
        .update(shortUpdates);
      console.log("update short posting information to database");

      // update full posting information to database
      await database.ref(`fullJobListings/${jobId}`).update(fullUpdates);
      console.log("update full posting information to database");

      // save short posting information to Redux
      const shortUpdatesRedux = {
        ...shortUpdates,
        id: jobId,
      };
      dispatch(editUsersJobListings(shortUpdatesRedux));
      dispatch(editJobListing(shortUpdatesRedux));

      console.log("startEditUsersJobListings finished");
    } catch (err) {
      throw err;
    }
  };
};

export const deleteUsersJobListings = (id) => ({
  type: "DELETE_USERS_JOB_LISTING",
  id,
});

export const startDeleteUsersJobListings = (jobId) => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;

    try {
      // delete short posting information from database
      await database.ref(`shortJobListings/${uid}/${jobId}`).remove();
      console.log("remove short posting information from database");

      // delete full posting information from database
      await database.ref(`fullJobListings/${jobId}`).remove();
      console.log("remove full posting information from database");

      // delete short posting information from Redux
      dispatch(deleteUsersJobListings(jobId));
      dispatch(deleteJobListing(jobId));

      console.log("startDeleteUsersJobListings finished");
    } catch (err) {
      throw err;
    }
  };
};
