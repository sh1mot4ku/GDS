const jobListingsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_JOB_LISTINGS":
      return action.jobListings;
    case "ADD_JOB_LISTING":
      return [...state, action.jobListing];
    case "EDIT_JOB_LISTING":
      return state.map((jobListing) => {
        if (jobListing.id === action.jobListing.id) {
          return action.jobListing;
        } else {
          return jobListing;
        }
      });
    case "DELETE_JOB_LISTING":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export default jobListingsReducer;
