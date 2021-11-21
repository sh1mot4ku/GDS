import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AppRouter, { history } from "./router/AppRouter";
import database, { auth } from "./firebase/firebase";
import { login, logout } from './action/user';
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
let hasRendered = false;

const jsx = (
  <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  </>
)

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
