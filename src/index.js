import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter, { history } from "./router/AppRouter";
import database, { auth } from "./firebase/firebase";
import { login, logout } from "./action/user";
import configureStore from "./store/configureStore";
import "./sass_config/reset.scss";
import "./sass_config/common_style.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E40F6",
    },
  },
});

const store = configureStore();
let hasRendered = false;

const jsx = (
  <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  </>
);

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

// Add loading page

auth.onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    const emailVerified = user.emailVerified;
    database
      .ref(`user/${uid}`)
      .once("value")
      .then((snapshot) => {
        store.dispatch(
          login({
            uid,
            emailVerified,
            userInfo: snapshot.val(),
          })
        );
        renderApp();
        if (history.location.pathname === "/") {
          history.push("/joblistings");
        }
      });
  } else {
    store.dispatch(logout());
    renderApp();
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
