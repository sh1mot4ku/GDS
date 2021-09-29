import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import reportWebVitals from './reportWebVitals';
import './style/reset.scss';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E40F6',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
		<ThemeProvider theme={theme} >
    <AppRouter />
		</ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
