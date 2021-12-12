import database from "../firebase/firebase";

export const insertUser = (postingInfo, authId) => {
  database
    .ref(`/user/${authId}`)
    .set(postingInfo)
    .then(() => {
      console.log("INSERT", postingInfo);
      console.log(authId);
    });
};

export const updateUser = (postingInfo, authId) => {
  database
    .ref(`/user/${authId}`)
    .update(postingInfo)
    .then(() => {
      console.log(authId);
      console.log("POST", postingInfo);
    });
};

export const getUser = (authId) => {
  database.ref(`/user/${authId}`).on("value", (snapshot) => {
    const changedPost = snapshot.val();
    console.log(changedPost);
  });
};

export const setFullJobListing = (jobId) => {
  console.log("setFullJobListing will run");
  return database.ref(`fullJobListings/${jobId}`).once("value");
};
