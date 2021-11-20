// import { auth } from '../firebase/firebase';

export const login = (user) => ({
  type: 'LOGIN',
  user
});

export const logout = () => ({
  type: 'LOGOUT'
});