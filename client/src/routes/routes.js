import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import SpotifyAuthMiddleWare from '../components/auth/SpotifyAuthMiddleWare';
import LandingPage from '../components/pages/landing/LandingPage';
import ServicesPage from '../components/pages/services/ServicesPage';
import SelectPlaylistsPage from '../components/pages/selectPlaylists/SelectPlaylistsPage';

export default function Routes({ srcAcc, destAcc }) {
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
      <ProtectedRoute path="/srcAcc/:spotify_user_id/playlists" component={(props) => <SelectPlaylistsPage {...props} srcAcc={srcAcc} />} />
    </Switch>
  );
}
