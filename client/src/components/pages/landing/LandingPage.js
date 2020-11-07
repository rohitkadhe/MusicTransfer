import React from 'react';
import './landingPage.css';
import { Button, Container, Header } from 'semantic-ui-react';
import { selectSourceRoute } from '../../../constants/strings';

export default function LandingPage({ history, location }) {
  return (
    <Container textAlign="center" text>
      <Header as="h1" id="landing-header">
        Welcome to Music Transfer
      </Header>
      <Header id="landing-text">Easily Transfer Playlists Between Spotify Accounts</Header>
      <Button
        color="green"
        size="huge"
        onClick={() =>
          history.push({
            pathname: `${selectSourceRoute}`,
            state: { prevPath: location.pathname },
          })
        }
      >
        Get Started
      </Button>
    </Container>
  );
}
