import database from "../firebase/firebase";

export const insertUser = (postingInfo, authId) => {
  return database.ref(`/user/${authId}`).set(postingInfo);
};

export const updateUser = (postingInfo, authId) => {
  database.ref(`/user/${authId}`).update(postingInfo);
};

export const getUser = (authId) => {
  database.ref(`/user/${authId}`).on("value", (snapshot) => {
    const changedPost = snapshot.val();
  });
};

export const setFullJobListing = (jobId) => {
  return database.ref(`fullJobListings/${jobId}`).once("value");
};
