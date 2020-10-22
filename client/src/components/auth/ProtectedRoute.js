import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default function ProtectedRoute({ Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          AuthService.isAuthenticated("srcAcc") &&
          AuthService.isAuthenticated("destAcc")
        ) {
          return <Component {...props} />;
        } else if (AuthService.isAuthenticated("srcAcc")) {
          return (
            <Redirect
              to={{
                pathname: "/selectDestination",
                state: { from: props.location },
              }}
            />
          );
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}