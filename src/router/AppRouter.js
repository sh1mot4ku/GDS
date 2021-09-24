import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage';
import Faqs from '../components/Faqs/Faqs';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/faqs" component={Faqs} exact={true} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
