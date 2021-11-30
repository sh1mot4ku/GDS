const usersJobListingsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS_JOB_LISTINGS":
      return action.jobListings;
    case "ADD_USERS_JOB_LISTING":
      return [...state, action.jobListing];
    default:
      return state;
  }
};

export default usersJobListingsReducer;
