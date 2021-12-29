const jobListingsReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_JOB_LISTINGS":
      return action.jobListings;
    case "ADD_JOB_LISTING":
      if (Array.isArray(state)) {
        return [...state, action.jobListing];
      } else {
        return [action.jobListing];
      }
    case "EDIT_JOB_LISTING":
      if (state === null) return state;
      return state?.map((jobListing) => {
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

export default jobListingsReducer;
