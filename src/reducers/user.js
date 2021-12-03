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
    default:
      return state;
  }
};

export default userReducer;
