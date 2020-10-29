import React, { useState } from 'react';
import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, List, Header, Segment, Button, Image, Checkbox } from 'semantic-ui-react';

export default function SelectPlaylistsPage({ history, location }) {
  const playlists = JSON.parse(localStorage.getItem('selectedPlaylists'));
  const [numCheckedBoxes, setNumCheckedBoxes] = useState(0);

  const renderResults = Object.values(playlists).map((playlist) => {
    const imageUrl = playlist.images.length === 3 ? playlist.images[2].url : SpotifyLogo;
    return (
      <List.Item key={playlist.name}>
        <List.Content className="vertically-center" floated="right">
          <Checkbox className="color-green" toggle onChange={(e, data) => handleCheckboxClick(e, data, playlist)} />
        </List.Content>
        <Image circular src={imageUrl} floated="left" />
        <List.Content floated="left">
          <List.Header className="list-text">{playlist.name}</List.Header>
        </List.Content>
      </List.Item>
    );
  });
  function handleCheckboxClick(e, data) {
    if (data.checked) {
      setNumCheckedBoxes(numCheckedBoxes + 1);
    } else {
      setNumCheckedBoxes(numCheckedBoxes - 1);
    }
  }

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
          disabled={numCheckedBoxes !== Object.values(playlists).length}
          onClick={() =>
            history.push({
              pathname: '/transfer',
              state: { prevPath: location.pathname, selectedPlaylists: { ...playlists } },
            })
          }
        >
          Confirm Transfer
        </Button>
      </Grid.Row>
    </Grid>
  );
}
