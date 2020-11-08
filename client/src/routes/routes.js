import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import SpotifyAuthMiddleWare from '../components/auth/SpotifyAuthMiddleWare';
import LandingPage from '../components/pages/landing/LandingPage';
import ServicesPage from '../components/pages/services/ServicesPage';
import SelectPlaylistsPage from '../components/pages/selectPlaylists/SelectPlaylistsPage';
import TransferSongsPage from '../components/pages/transferSongs/TransferSongsPage';
import {
  homeRoute,
  selectSourceRoute,
  selectDestinationRoute,
  spotifyAuthRedirectRoute,
  selectPlaylistsRoute,
  transferSongsRoute,
  sourceAccount,
  destinationAccount,
  selectDestinationAccount,
  selectSourceAccount,
  selectPlaylists,
} from '../constants/strings';
import AuthService from '../services/AuthService';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={homeRoute} component={(props) => <LandingPage {...props} />} />

      <Route
        exact
        path={selectSourceRoute}
        component={(props) => (
          <ServicesPage {...props} accType={sourceAccount} title={selectSourceAccount} />
        )}
      />
      <Route
        exact
        path={spotifyAuthRedirectRoute}
        component={(props) => <SpotifyAuthMiddleWare {...props} />}
      />

      <ProtectedRoute
        exact
        path={selectDestinationRoute}
        component={(props) => (
          <ServicesPage {...props} accType={destinationAccount} title={selectDestinationAccount} />
        )}
        allowRender={AuthService.isAuthenticated(sourceAccount)}
      />
      <ProtectedRoute
        exact
        path={selectPlaylistsRoute}
        component={(props) => <SelectPlaylistsPage {...props} title={selectPlaylists} />}
        allowRender={AuthService.isAuthenticated(sourceAccount)}
      />
      <ProtectedRoute
        exact
        path={transferSongsRoute}
        component={(props) => <TransferSongsPage {...props} />}
      />
      <Route path="*" component={() => <Redirect to={homeRoute} />} />
    </Switch>
  );
}
