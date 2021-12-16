import { auth } from "../firebase/firebase";

export const login = (user) => ({
  type: "LOGIN",
  user,
});

// Write startLogin too

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogout = () => {
  return () => {
    return auth
      .signOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const editUserInfo = (userInfo) => ({
  type: "EDIT_USER_INFO",
  userInfo,
});

export const turnOnProfileEdited = () => ({
  type: "TURN_ON_PROFILE_EDITED",
});
export const turnOffProfileEdited = () => ({
  type: "TURN_OFF_PROFILE_EDITED",
});
