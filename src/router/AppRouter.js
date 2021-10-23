import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPage from "../components/TopPage/TopPage";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={TopPage} exact={true} />
      <Route path="/faqs" component={FaqsPage} exact={true} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default AppRouter;
