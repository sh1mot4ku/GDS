import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from "../components/TopPage/TopPage";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import Wrapper from "../components/Wrapper/Wrapper";

const AppRouter = () => (
  <BrowserRouter>
    <Wrapper>
      <Switch>
        <Route path="/" component={TopPage} exact={true} />
        <Route path="/faqs" component={FaqsPage} exact={true} />
      </Switch>
    </Wrapper>
  </BrowserRouter>
);

export default AppRouter;
