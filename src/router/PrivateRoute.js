import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(uid);
  }, [uid]);

  return (
    <Route
      {...rest}
      component={(props) =>
        uid ? (
          <Wrapper>
            <Component {...props} />
          </Wrapper>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
