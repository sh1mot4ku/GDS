import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Apply from "../components/Apply/Apply";
import TopPage from '../components/TopPage/TopPage';




const AppRouter = () => {

  return (
    <BrowserRouter>

          <Switch>
            {/* <Route path="/" component={TopPage} exact={true} /> */}
            <Route path="/apply-developer" component={Apply} />
          </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
