import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { sourceAccount, destinationAccount, errorRoute } from '../../constants/strings';

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
          return (
            <Redirect
              to={{
                pathname: errorRoute,
                state: {
                  from: props.location.pathname,
                  status: `${401} Unauthorized`,
                  message: 'Authentication Error',
                },
              }}
            />
          );
        }
      }}
    />
  );
};
