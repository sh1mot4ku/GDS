import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TopPage from "../components/TopPage/TopPage";
import AboutPage from "../components/AboutPage/AboutPage";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import Apply from "../components/Apply/Apply";
import ContactForm from "../components/Contact/ContactForm/ContactForm";
import Login from "../components/Login/Login";
import Wrapper from "../components/Wrapper/Wrapper";
import { createBrowserHistory } from "history";
import Recruiter from "../components/Recruiter/Recruiter";
// import Profile from "../components/Edit/Profile"
import Edit from "../components/Edit/Edit";
import PostJobListings from "../components/PostJobListings/PostJobListings";
import JobListings from "../components/JobListings/JobListings";
import JobListing from "../components/JobListings/JobListing";
import JobListingsManagement from "../components/PostJobListings/JobListingsManagement";
import EditJobListing from "../components/PostJobListings/EditJobListing";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={TopPage} exact={true} />
      <PublicRoute path="/about" component={AboutPage} />
      <PublicRoute path="/faqs" component={FaqsPage} />
      <PublicRoute path="/apply-developer" component={Apply} />
      <PublicRoute path="/apply-recruiter" component={Recruiter} />
      <PrivateRoute path="/post_joblistings" component={PostJobListings} />
      <PrivateRoute
        path="/joblistings_management"
        component={JobListingsManagement}
      />
      <PrivateRoute path="/edit_joblisting/:jobId" component={EditJobListing} />
      <PublicRoute path="/joblistings" component={JobListings} />
      <PublicRoute path="/joblisting/:jobId" component={JobListing} />
      <PublicRoute path="/contact" component={ContactForm} />
      <PublicRoute path="/login" component={Login} />
      <PrivateRoute path="/edit" component={Edit} />
    </Switch>
  </Router>
);

export { history, AppRouter as default };
