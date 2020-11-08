import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { sourceAccount, destinationAccount, homeRoute } from '../../constants/strings';

export const ProtectedRoute = ({ component: Component, allowRender, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        if (
          allowRender ||
          (AuthService.isAuthenticated(sourceAccount) &&
            AuthService.isAuthenticated(destinationAccount))
        ) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: homeRoute, state: { from: props.location } }} />;
        }
      }}
    />
  );
};
