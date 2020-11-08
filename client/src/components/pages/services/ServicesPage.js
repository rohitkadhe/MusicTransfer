import React from 'react';
import './servicesPage.css';
import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, Card, Header, Image } from 'semantic-ui-react';
import SessionStorageService from '../../../services/SessionStorageService';
import { authRoute, authPopupTitle } from '../../../constants/strings';
export default function ServicesPage({ title, accType, history, location }) {
  function openCenteredPopup(url, title, w, h) {
    var left = window.screen.width / 2 - w / 2;
    var top = window.screen.height / 2 - h / 2;
    return window.open(url, title, `width=${w},height=${h}, top=${top}, left=${left}`);
  }

  const authenticateOnClick = () => {
    let popup = openCenteredPopup(authRoute(accType), authPopupTitle, 500, 800);
    const spotifyCallback = (url, accType, userAccount) => {
      popup.close();
      SessionStorageService.save(accType, userAccount);
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
