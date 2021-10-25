import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Apply from "../components/Apply";
import TopPage from '../components/TopPage/TopPage';
import {
  UserContext,
  BusinessUserContext,
  initialUser,
  initialBusinessUser,
} from "../context/user-context";
import { createBrowserHistory }from 'history';

const history = createBrowserHistory();

const AppRouter = () => {
  const [user, setUser] = useState(initialUser);
  const [business, setBusiness] = useState(initialBusinessUser);

  return (
    <Router history={history}>
      <UserContext.Provider value={[user, setUser]}>
        <BusinessUserContext.Provider value={[business, setBusiness]}>
          <Switch>
            <Route path="/" component={TopPage} exact={true} />
            <Route path="/apply-developer" component={Apply} />
          </Switch>
        </BusinessUserContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export { history, AppRouter as default };
