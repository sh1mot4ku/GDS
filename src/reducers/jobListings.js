const jobListingsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_JOB_LISTINGS":
      return action.jobListings;
    case "ADD_JOB_INFO":
      return [...state, action.jobinfo];
    default:
      return state;
  }
};

export default jobListingsReducer;
