import React, { useState, useEffect } from 'react';
import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, Card, Header, Image, Message } from 'semantic-ui-react';
import SessionStorageService from '../../../services/SessionStorageService';
import {
  authRoute,
  authPopupTitle,
  sourceAccount,
  destinationAccount,
  errorRoute,
} from '../../../constants/strings';
import './servicesPage.css';
import AuthService from '../../../services/AuthService';

export default function ServicesPage({ title, accType, history }) {
  const [dismissed, setDismissed] = useState(false);
  let popup;

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setDismissed(true);
      }
    }, 15000);
    return () => (mounted = false);
  }, []);

  function openCenteredPopup(url, title, w, h) {
    var left = window.screen.width / 2 - w / 2;
    var top = window.screen.height / 2 - h / 2;
    return window.open(url, title, `width=${w},height=${h}, top=${top}, left=${left}`);
  }

  const authenticateOnClick = () => {
    if (accType === sourceAccount) {
      popup = openCenteredPopup(authRoute(accType), authPopupTitle, 500, 800);
    } else if (accType === destinationAccount && AuthService.isAuthenticated(sourceAccount)) {
      popup = openCenteredPopup(authRoute(accType), authPopupTitle, 500, 800);
    } else {
      history.push({
        pathname: errorRoute,
        state: {
          error: {
            status: `${401} Unauthorized`,
            message: 'Authentication Error',
          },
        },
      });
    }
    window.spotifyCallback = spotifyCallback;
  };
  const spotifyCallback = (url, accType, userAccount) => {
    if (userAccount) {
      SessionStorageService.save(accType, userAccount);
      history.push(url);
    }
    popup.close();
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  function renderMessage(accType) {
    if (accType === sourceAccount) {
      return (
        <Grid.Row>
          <Message hidden={dismissed} onDismiss={handleDismiss} color="green">
            <Message.Header>Important Note</Message.Header>
            <p>
              If you are using <b>Facebook, Google</b> or <b>Apple</b> to sign in to Spotify for the{' '}
              <b>Source Account,</b> log out before selecting the <b>Destination Account</b>
            </p>
          </Message>
        </Grid.Row>
      );
    }
    return <></>;
  }
  return (
    <Grid container centered textAlign="center">
      {renderMessage(accType)}
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
