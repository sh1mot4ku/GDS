const usersJobListingsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS_JOB_LISTINGS":
      return action.jobListings;
    case "ADD_USERS_JOB_LISTING":
      return [...state, action.jobListing];
    case "EDIT_USERS_JOB_LISTING":
      return state.map((jobListing) => {
        if (jobListing.id === action.jobListing.id) {
          return action.jobListing;
        } else {
          return jobListing;
        }
      });
    default:
      return state;
  }
};

export default usersJobListingsReducer;
