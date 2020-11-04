import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import SpotifyAuthMiddleWare from '../components/auth/SpotifyAuthMiddleWare';
import LandingPage from '../components/pages/landing/LandingPage';
import ServicesPage from '../components/pages/services/ServicesPage';
import SelectPlaylistsPage from '../components/pages/selectPlaylists/SelectPlaylistsPage';
import TransferSongsPage from '../components/pages/transferSongs/TransferSongsPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={(props) => <LandingPage {...props} />} />
      <Route
        exact
        path="/selectSource"
        component={(props) => (
          <ServicesPage {...props} account_type={'srcAcc'} title={`Select the Source Account`} />
        )}
      />
      <Route
        exact
        path="/spotify/srcAcc/:access_token"
        component={(props) => <SpotifyAuthMiddleWare {...props} account_type="srcAcc" />}
      />
      <Route
        exact
        path="/spotify/destAcc/:access_token"
        component={(props) => <SpotifyAuthMiddleWare {...props} account_type="destAcc" />}
      />
      <Route
        exact
        path="/selectDestination"
        component={(props) => (
          <ServicesPage {...props} account_type="destAcc" title="Select the Destination account" />
        )}
      />
      <Route
        exact
        path="/srcAcc/spotify/:spotify_user_id/playlists"
        component={(props) => <SelectPlaylistsPage {...props} />}
      />
      <ProtectedRoute
        exact
        path="/destAcc/spotify/transfer"
        component={(props) => <TransferSongsPage {...props} />}
      />
      {/* /* <Route path="*" component={() => <Redirect to="/" />} /> */}
    </Switch>
  );
}
