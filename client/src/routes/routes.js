import React from 'react';
import LandingPage from '../components/pages/landing/LandingPage';
import ServicesPage from '../components/pages/services/ServicesPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import SpotifyAuthMiddleWare from '../components/auth/SpotifyAuthMiddleWare';
import { Route, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={(props) => <LandingPage {...props} />} />
      <Route path="/selectSource" component={(props) => <ServicesPage {...props} account_type={'srcAcc'} title={`Select the Source Account`} />} />
      <Route path="/spotify/srcAcc/:access_token" component={(props) => <SpotifyAuthMiddleWare {...props} account_type="srcAcc" />} />
      <Route path="/spotify/destAcc/:access_token" component={(props) => <SpotifyAuthMiddleWare {...props} account_type="destAcc" />} />
      <ProtectedRoute
        path="/selectDestination"
        component={(props) => <ServicesPage {...props} account_type="destAcc" title="Select Destination account" />}
      />
    </Switch>
  );
}
