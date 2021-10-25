import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AppRouter, { history } from './router/AppRouter';
import database, { auth } from './firebase/firebase';
import AuthContext from './context/auth-context';
import './sass_config/reset.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E40F6',
    },
  },
});
let loginId = null; // use this to judge if user is log in or not
let userInfo = null; // user information
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <>
        <ThemeProvider theme={theme} >
          <AuthContext.Provider value={{ loginId, userInfo }}>
            <AppRouter />
          </AuthContext.Provider>
        </ThemeProvider>
      </>,
      document.getElementById('root')
    );    
    hasRendered = true;
  }
};

auth.onAuthStateChanged(user => {
  if (user) {
    loginId = user.uid;
    database.ref(`user/${user.uid}`).once('value').then((snapshot) => {
      userInfo = snapshot.val();
      renderApp();
      // if (history.location.pathname === '/') {
      //   history.push('/'); // If they made a page for log in user, push it to that page
      // }  
    })
  } else {
    loginId = null;
    renderApp();
    history.push('/');
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
