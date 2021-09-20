import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage';
import Apply from '../components/Apply';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
    </Switch>
    <Apply />
  </BrowserRouter>
)

export default AppRouter;
