const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return {};
    case "EDIT_USER_INFO":
      return {
        ...state,
        userInfo: action.userInfo,
      };
    // case "TURN_ON_PROFILE_EDITED":
    //   const editedState = { ...state };
    //   editedState.userInfo.profileEdited = true;
    //   return editedState;
    case "TURN_OFF_PROFILE_EDITED":
      const newState = { ...state };
      newState.userInfo.profileEdited = false;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
