import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from '../components/TopPage/TopPage';
import AboutPage from '../components/AboutPage/AboutPage';
import FaqsPage from '../components/FaqsPage/FaqsPage';
import Apply from "../components/Apply/Apply";

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/about" component={AboutPage} exact={true} />
      <Route path="/faqs" component={FaqsPage} exact={true} />
      <Route path="/apply-developer" component={Apply} />
    </Switch>
  </BrowserRouter>
)

export default AppRouter;
