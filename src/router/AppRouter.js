import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Apply from "../components/Apply/Apply";
import Recruiter from "../components/Recruiter/Recruiter";
import TopPage from '../components/TopPage/TopPage';
import { createBrowserHistory }from 'history';

const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={TopPage} exact={true} />
        <Route path="/apply-developer" component={Apply} />
        <Route path="/apply-recruiter" component={Recruiter} />
      </Switch>
    </Router>
  );
};

export { history, AppRouter as default };
