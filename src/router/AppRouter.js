import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage';
import FaqsPage from '../components/FaqsPage/FaqsPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/faqs" component={FaqsPage} exact={true} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
