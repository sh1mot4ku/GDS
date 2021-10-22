import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Apply from "../components/Apply";
import TopPage from '../components/TopPage/TopPage';
import {
  UserContext,
  BusinessUserContext,
  initialUser,
  initialBusinessUser,
} from "../context";
import { createBrowserHistory }from 'history';
// import { useHistory } from 'react-router-dom';

const history = createBrowserHistory();

// const history = useHistory();

const AppRouter = () => {
  const [user, setUser] = useState(initialUser);
  const [business, setBusiness] = useState(initialBusinessUser);

  return (
    <Router history={history}>
      <UserContext.Provider value={[user, setUser]}>
        <BusinessUserContext.Provider value={[business, setBusiness]}>
          <Switch>
          {/* <Route path="/" component={TopPage} exact={true} /> */}
          </Switch>
          <Apply />
        </BusinessUserContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export { history, AppRouter as default };
