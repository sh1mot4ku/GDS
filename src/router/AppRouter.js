import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";
import TopPage from "../components/TopPage/TopPage";
import AboutPage from "../components/AboutPage/AboutPage";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import Apply from "../components/Apply/Apply";
import PostJobListings from '../components/PostJobListings/PostJobListings';
import JobListings from '../components/JobListings/JobListings';
import JobListing from '../components/JobListings/JobListing';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Wrapper>
      <Switch>
        <Route path="/" component={TopPage} exact={true} />
        <Route path="/about" component={AboutPage} exact={true} />
        <Route path="/faqs" component={FaqsPage} exact={true} />
        <Route path="/apply-developer" component={Apply} />
        <Route path="/post_joblistings" component={PostJobListings} />
        <Route path="/joblistings" component={JobListings} />
        <Route path="/joblisting/:id" component={JobListing} />
      </Switch>
    </Wrapper>
  </Router>
);

export { history, AppRouter as default };
