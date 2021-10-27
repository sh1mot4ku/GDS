import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage/TopPage';
import AboutPage from '../components/AboutPage/AboutPage';
import FaqsPage from '../components/FaqsPage/FaqsPage';
import Apply from "../components/Apply/Apply";
import Header from "../components/HeaderAndFooter/Header/Header";
import Footer from "../components/HeaderAndFooter/Footer/Footer";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/about" component={AboutPage} exact={true} />
      <Route path="/faqs" component={FaqsPage} exact={true} />
      <Route path="/apply-developer" component={Apply} />
    </Switch>
    <Footer />
  </Router>
);


export { history, AppRouter as default };
