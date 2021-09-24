import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage';
import AboutPage from '../components/AboutPage/AboutPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/about" component={AboutPage} exact={true} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
