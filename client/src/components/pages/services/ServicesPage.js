import React from 'react';
import './servicesPage.css';
import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, Card, Header, Image } from 'semantic-ui-react';
import AuthService from '../../../services/AuthService';

export default function ServicesPage({ title, account_type, history, location }) {
  function openCenteredPopup(url, title, w, h) {
    var left = window.screen.width / 2 - w / 2;
    var top = window.screen.height / 2 - h / 2;
    return window.open(url, title, `width=${w},height=${h}, top=${top}, left=${left}`);
  }

  const authenticateOnClick = () => {
    let popup = openCenteredPopup(
      `http://localhost:5433/spotify/authenticate/${account_type}`,
      'Login with Spotify',
      500,
      800,
    );
    const spotifyCallback = (url, account_type, userAccount) => {
      popup.close();
      AuthService.saveAccount(account_type, userAccount);
      console.log('i ran');
      history.push(url);
    };
    window.spotifyCallback = spotifyCallback;
  };
  return (
    <Grid container centered textAlign="center">
      <Grid.Row>
        <Header id="select-account-header" as="h1">
          {title}
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Card raised>
          <Card.Content>
            <div style={{ cursor: 'pointer' }}>
              <Image src={SpotifyLogo} onClick={() => authenticateOnClick()} />
            </div>
          </Card.Content>

          <Card.Content extra textAlign="center">
            <Header as="h2">Spotify</Header>
          </Card.Content>
        </Card>
      </Grid.Row>
    </Grid>
  );
}
