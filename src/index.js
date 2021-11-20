import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AppRouter, { history } from "./router/AppRouter";
import database, { firebase, auth } from "./firebase/firebase";
import AuthContext from "./context/auth-context";
import { login, logout } from './action/auth';
// import UserProvider from "./context/user-context";
import "./sass_config/reset.scss";
import configureStore from "./store/configureStore";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E40F6",
    },
  },
});
const store = configureStore();

// let loginId = null; // use this to judge if user is log in or not
// let userInfo = null; // user information
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            {/* <UserProvider> 一旦消してユーザー編集機能などが動くかどうか見てみる */}
            <AppRouter />
            {/* </UserProvider> */}
          </Provider>
        </ThemeProvider>
      </>,
      document.getElementById("root")
    );
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    database
      .ref(`user/${uid}`)
      .once("value")
      .then((snapshot) => {
        store.dispatch(login({ 
          uid,
          userInfo: snapshot.val()
        }))
        renderApp();
        // if (history.location.pathname === '/') {
        //   history.push('/job_listings'); // push it to job listings page after merging
        // }
      });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
