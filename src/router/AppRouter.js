import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage';
import PostJobListings from '../components/PostJobListings/PostJobListings';
import JobListings from '../components/JobListings/JobListings';
import JobListing from '../components/JobListings/JobListing';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/post_joblistings" component={PostJobListings} />
      <Route path="/joblistings" component={JobListings} />
      <Route path="/joblistings/:id" component={JobListing} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
