import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import TopPage from '../components/TopPage/TopPage';
import AboutPage from '../components/AboutPage/AboutPage';
import FaqsPage from '../components/FaqsPage/FaqsPage';
import Apply from '../components/Apply/Apply';
import ContactForm from '../components/Contact/ContactForm/ContactForm';
import Login from '../components/Login/Login';
import Wrapper from '../components/Wrapper/Wrapper';
import { createBrowserHistory } from 'history';
import Recruiter from '../components/Recruiter/Recruiter';

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Wrapper>
      <Switch>
        <Route path="/" component={TopPage} exact={true} />
        <Route path="/about" component={AboutPage} />
        <Route path="/faqs" component={FaqsPage} />
        <Route path="/apply-developer" component={Apply} />
        <Route path="/contact" component={ContactForm} />
        <Route path="/apply-recruiter" component={Recruiter} />
        <Route path="/login" component={Login} />
      </Switch>
    </Wrapper>
  </Router>
);

export { history, AppRouter as default };
