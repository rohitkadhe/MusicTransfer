import React, { useState } from 'react';
import MusicTransferLoader from '../../loader/MusicTransferLoader';
import AuthService from '../../../services/AuthService';
import { useAxiosGet } from '../../../hooks/useAxios';
import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, List, Header, Segment, Button, Image, Checkbox } from 'semantic-ui-react';

export default function SelectPlaylistsPage({ history, location }) {
  const [srcAcc] = useState(AuthService.getAccFromLocalStorage('srcAcc'));
  const [playlists, setPlaylists] = useState({});
  const auth = {
    headers: { Authorization: `Bearer ${srcAcc.access_token}` },
  };

  function handleCheckboxClick(e, index, data, playlist) {
    if (data.checked) {
      playlists[index] = playlist;
      setPlaylists({ ...playlists });
    } else {
      delete playlists[index];
      setPlaylists({ ...playlists });
    }
  }

  const [response, error, isLoading] = useAxiosGet({ url: `/spotify/${srcAcc.id}/playlists`, config: auth });
  if (isLoading) {
    return <MusicTransferLoader />;
  }
  if (error) {
    return <div>Error</div>;
  } else {
    const renderResults = response.map((playlist, index) => {
      const imageUrl = playlist.images.length === 3 ? playlist.images[2].url : SpotifyLogo;
      return (
        <List.Item key={playlist.name}>
          <List.Content className="vertically-center" floated="right">
            <Checkbox className="color-green" toggle onChange={(e, data) => handleCheckboxClick(e, index, data, playlist)} />
          </List.Content>
          <Image circular src={imageUrl} floated="left" />
          <List.Content floated="left">
            <List.Header className="list-text">{playlist.name}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
    return (
      <Grid container textAlign="center">
        <Grid.Row>
          <Header as="h1">Select Playlists To Transfer</Header>
        </Grid.Row>
        <Grid.Row>
          <Segment>
            <List relaxed="very" divided verticalAlign="middle" style={{ padding: '1rem' }}>
              {renderResults}
            </List>
          </Segment>
        </Grid.Row>
        <Grid.Row>
          <Button
            color="green"
            size="huge"
            disabled={Object.values(playlists).length === 0}
            onClick={() => {
              localStorage.setItem('selectedPlaylists', JSON.stringify(playlists));
              history.push({
                pathname: '/selectDestination',
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
