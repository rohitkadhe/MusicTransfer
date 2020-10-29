import React from 'react';
import './servicesPage.css';
import SpotifyLogo from '../../../icons/spotify.png';
import { Grid, Card, Header, Image } from 'semantic-ui-react';
export default function ServicesPage({ title, account_type }) {
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
            <a href={`http://localhost:5433/spotify/authenticate/${account_type}`}>
              <Image src={SpotifyLogo} />
            </a>
          </Card.Content>

          <Card.Content extra textAlign="center">
            <Header as="h2">Spotify</Header>
          </Card.Content>
        </Card>
      </Grid.Row>
    </Grid>
  );
}
