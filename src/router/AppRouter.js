import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage';
import PostJobList from '../components/PostJobList/PostJobList';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/post_joblist" component={PostJobList} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
