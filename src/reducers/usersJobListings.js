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
    case "DELETE_USERS_JOB_LISTING":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export default usersJobListingsReducer;
