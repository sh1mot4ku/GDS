import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";

const LogoutRoute = ({ component: Component, ...rest }) => {
  const { uid } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      component={(props) =>
        uid ? (
          <Redirect to="/joblistings" />
        ) : (
          <Wrapper>
            <Component {...props} />
          </Wrapper>
        )
      }
    />
  );
};

export default LogoutRoute;
