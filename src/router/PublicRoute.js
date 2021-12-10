import React from "react";
import { Route } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => (
        <Wrapper>
          <Component {...props} />
        </Wrapper>
      )}
    />
  );
};

export default PublicRoute;
