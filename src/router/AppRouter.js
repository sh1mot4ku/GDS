import React from "react";
import { Router, Switch } from "react-router-dom";
import TopPage from "../components/TopPage/TopPage";
import AboutPage from "../components/AboutPage/AboutPage";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import Apply from "../components/Apply/Apply";
import ContactForm from "../components/Contact/ContactForm/ContactForm";
import Login from "../components/Login/Login";
import { createBrowserHistory } from "history";
import Recruiter from "../components/Recruiter/Recruiter";
import Profile from "../components/Profile/Profile";
import ProfileEdit from "../components/Profile/ProfileEdit";
import ProfileEditRecruiterPage from "../components/Profile/ProfileEditRecruiterPage";
import ProfileRecruiterPage from "../components/Profile/ProfileRecruiterPage";
import PostJobListings from "../components/PostJobListings/PostJobListings";
import JobListings from "../components/JobListings/JobListings";
import JobListing from "../components/JobListings/JobListing";
import JobListingsManagement from "../components/PostJobListings/JobListingsManagement";
import EditJobListing from "../components/PostJobListings/EditJobListing";
import CopyJobListing from "../components/PostJobListings/CopyJobListing";
import NotFoundPage from "../components/notFoundPage/NotFoundPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LogoutRoute from "./LogoutRoute";
import SendMailConfirm from "../components/Apply/SendMailConfirm";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import ConfirmSentMail from "../components/ResetPassword/ConfirmSentMail";
import { isMobile } from "react-device-detect";
import ThankYou from "../components/Apply/ThankYou";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <LogoutRoute path="/" component={TopPage} exact={true} />
      <PublicRoute path="/about" component={AboutPage} />
      <PublicRoute path="/faqs" component={FaqsPage} />
      <PublicRoute path="/apply-developer" component={Apply} />
      <PublicRoute path="/apply-recruiter" component={Recruiter} />
      <PrivateRoute path="/send-mail-confirm" component={SendMailConfirm} />
      <PrivateRoute path="/thank-you" component={ThankYou} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/profile_edit" component={ProfileEdit} />
      <PrivateRoute
        path="/profile-recruiter-page"
        component={ProfileRecruiterPage}
      />
      <PrivateRoute
        path="/profile-edit-recruiter-page"
        component={ProfileEditRecruiterPage}
      />
      <PrivateRoute path="/post_joblistings" component={PostJobListings} />
      {!isMobile && (
        <PrivateRoute
          path="/joblistings_management"
          component={JobListingsManagement}
        />
      )}
      <PrivateRoute path="/edit_joblisting/:jobId" component={EditJobListing} />
      <PrivateRoute path="/copy_joblisting/:jobId" component={CopyJobListing} />
      <PublicRoute path="/joblistings" component={JobListings} />
      <PublicRoute path="/joblisting/:jobId" component={JobListing} />
      <PublicRoute path="/contact" component={ContactForm} />
      <LogoutRoute path="/login" component={Login} />
      <LogoutRoute path="/reset-password" component={ResetPassword} />
      <LogoutRoute path="/reset-password-confirm" component={ConfirmSentMail} />
      <PublicRoute path="*" component={NotFoundPage} />
    </Switch>
  </Router>
);

export { history, AppRouter as default };
