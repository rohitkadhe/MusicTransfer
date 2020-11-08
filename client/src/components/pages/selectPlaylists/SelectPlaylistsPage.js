import React, { useState } from 'react';
import MusicTransferLoader from '../../loader/MusicTransferLoader';
import AuthService from '../../../services/AuthService';
import { useAxiosGet } from '../../../hooks/useAxios';
import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, List, Header, Button, Image, Checkbox } from 'semantic-ui-react';
import {
  userPlaylistRoute,
  selectDestinationRoute,
  sourceAccount,
  selectedPlaylistsKey,
} from '../../../constants/strings';

import SessionStorageService from '../../../services/SessionStorageService';

export default function SelectPlaylistsPage({ history, location, title }) {
  const srcAcc = AuthService.getAccount(sourceAccount);
  const [playlists, setPlaylists] = useState([]);
  const auth = {
    headers: { Authorization: `Bearer ${srcAcc.access_token}` },
  };

  function handleCheckboxClick(data, playlist) {
    if (data.checked) {
      setPlaylists([...playlists, playlist]);
    } else {
      let filtered = playlists.slice(0).filter((p) => p.id !== playlist.id);
      setPlaylists(filtered);
    }
  }

  const [response, error, isLoading] = useAxiosGet({
    url: userPlaylistRoute(srcAcc.id),
    config: auth,
  });
  if (isLoading) {
    return <MusicTransferLoader />;
  }
  if (error) {
    return <div>Error</div>;
  } else {
    const renderResults = response.map((playlist) => {
      const imageUrl = playlist.images.length > 0 ? playlist.images[0].url : SpotifyLogo;
      return (
        <List.Item key={playlist.id}>
          <List.Content floated="right">
            <Checkbox
              className="color-green"
              toggle
              onChange={(e, data) => handleCheckboxClick(data, playlist)}
            />
          </List.Content>
          <Image size="tiny" circular src={imageUrl} floated="left" />
          <List.Content className="vertically-center" floated="left">
            <List.Header>{playlist.name}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
    return (
      <Grid container verticalAlign="middle" centered>
        <Grid.Row>
          <Header as="h1">{title}</Header>
        </Grid.Row>
        <Grid.Row>
          <List relaxed="very" divided verticalAlign="middle" style={{ padding: '1rem' }}>
            {renderResults}
          </List>
        </Grid.Row>
        <Grid.Row>
          <Button
            color="green"
            size="huge"
            disabled={playlists.length === 0}
            onClick={() => {
              SessionStorageService.save(selectedPlaylistsKey, playlists);
              history.push({
                pathname: selectDestinationRoute,
                state: { prevPath: location.pathname },
              });
            }}
          >
            Next
          </Button>
        </Grid.Row>
      </Grid>
    );
  }
}
