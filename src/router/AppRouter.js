import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Apply from "../components/Apply";
import TopPage from '../components/TopPage/TopPage';


import {
  UserContext,
  BusinessUserContext,
  initialUser,
  initialBusinessUser,
} from "../context";

const AppRouter = () => {
  const [user, setUser] = useState(initialUser);
  const [business, setBusiness] = useState(initialBusinessUser);

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <BusinessUserContext.Provider value={[business, setBusiness]}>
          <Switch>
          {/* <Route path="/" component={TopPage} exact={true} /> */}
          </Switch>
          <Apply />
        </BusinessUserContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
