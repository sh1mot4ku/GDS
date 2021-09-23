import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage';
import PostJobList from '../components/PostJobList/PostJobList';
import JobListings from '../components/JobList/JobListings';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/post_joblist" component={PostJobList} />
      <Route path="/joblistings" component={JobListings} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
