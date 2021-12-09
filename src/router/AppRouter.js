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
import ForgetPassword from "../components/PostJobListings/ForgetPassword";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Wrapper>
      <Switch>
        <Route path="/" component={TopPage} exact={true} />
        <Route path="/about" component={AboutPage} />
        <Route path="/faqs" component={FaqsPage} />
        <Route path="/apply-developer" component={Apply} />
        <Route path="/apply-recruiter" component={Recruiter} />
        <Route path="/post_joblistings" component={PostJobListings} />
        <Route
          path="/joblistings_management"
          component={JobListingsManagement}
        />
        <Route path="/edit_joblisting/:jobId" component={EditJobListing} />
        <Route path="/joblistings" component={JobListings} />
        <Route path="/joblisting/:jobId" component={JobListing} />
        <Route path="/contact" component={ContactForm} />
        <Route path="/login" component={Login} />
        <Route path="/edit" component={Edit} />
        <Route path="/forget-password" component={ForgetPassword} />
      </Switch>
    </Wrapper>
  </Router>
);

export { history, AppRouter as default };
