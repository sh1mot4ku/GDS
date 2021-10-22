import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AppRouter, { history } from './router/AppRouter';
import { auth } from './firebase/firebase';
import AuthContext from './context/auth-context';
import './sass_config/reset.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E40F6',
    },
  },
});
let uid = null;
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <>
        <ThemeProvider theme={theme} >
          <AuthContext.Provider value={{ uid }}>
            <AppRouter />
            {/* <App /> */}
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
    uid = user.uid;
    // authのuidを元にユーザデータをデータベースから取得 -> thenで繋ぐ
    renderApp();
    // ログインしているユーザ向けのトップページはどうするか？
    if (history.location.pathname === '/') {
      history.push('/'); // ログインユーザ向けのページに飛ばす？
    }
  } else {
    uid = null;
    renderApp();
    history.push('/');
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
