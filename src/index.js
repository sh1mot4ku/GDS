import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import reportWebVitals from './reportWebVitals';
import './style/reset.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
