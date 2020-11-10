import React, { useState, useEffect } from 'react';
import ax from '../../../axios/axios';
import MusicTransferLoader from '../../loader/MusicTransferLoader';
import AuthService from '../../../services/AuthService';

import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, List, Header, Button, Image, Checkbox } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import {
  userPlaylistRoute,
  selectDestinationRoute,
  sourceAccount,
  selectedPlaylistsKey,
  errorRoute,
} from '../../../constants/strings';

import SessionStorageService from '../../../services/SessionStorageService';

export default function SelectPlaylistsPage({ history, location, title }) {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    let srcAcc = AuthService.getAccount(sourceAccount);
    if (!srcAcc) {
      srcAcc = {};
    }
    let auth = {
      headers: { Authorization: `Bearer ${srcAcc.access_token}` },
    };
    const fetchPlaylists = async () => {
      try {
        setIsLoading(true);
        let response = await ax.get(userPlaylistRoute(srcAcc.id), auth);
        if (isMounted) {
          setResponse(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.response);
        }
      }
    };
    fetchPlaylists();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleCheckboxClick(data, playlist) {
    if (data.checked) {
      setSelectedPlaylists([...selectedPlaylists, playlist]);
    } else {
      let filtered = selectedPlaylists.slice(0).filter((p) => p.id !== playlist.id);
      setSelectedPlaylists(filtered);
    }
  }

  const renderResults = () =>
    response.map((playlist) => {
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

  if (error) {
    return (
      <Redirect
        to={{
          pathname: errorRoute,
          state: {
            status: error.data.status,
            message: error.data.message,
          },
        }}
      />
    );
  }
  if (isLoading) {
    return <MusicTransferLoader />;
  } else {
    return (
      <Grid container verticalAlign="middle" centered>
        <Grid.Row>
          <Header as="h1">{title}</Header>
        </Grid.Row>
        <Grid.Row>
          <List relaxed="very" divided verticalAlign="middle" style={{ padding: '1rem' }}>
            {renderResults()}
          </List>
        </Grid.Row>
        <Grid.Row>
          <Button
            color="green"
            size="huge"
            disabled={selectedPlaylists.length === 0}
            onClick={() => {
              SessionStorageService.save(selectedPlaylistsKey, selectedPlaylists);
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
