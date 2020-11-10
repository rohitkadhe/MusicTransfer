import React from 'react';
import { Message, Header, Grid, Button } from 'semantic-ui-react';
import { homeRoute } from '../../../constants/strings';

export default function ErrorPage({ history, location }) {
  const { status, message } = location.state;

  return (
    <Grid container centered textAlign="center">
      <Grid.Row>
        <Header style={{ marginTop: '3em' }} as="h1">
          Oops looks like something went wrong! :(
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Message style={{ marginTop: '2em' }} size="big" color="red">
          <Message.Header>{status || 500}</Message.Header>
          <p>{message || 'Internal Server Error'}</p>
        </Message>
      </Grid.Row>
      <Grid.Row>
        <Button
          color="green"
          size="huge"
          onClick={() => {
            history.push(homeRoute);
          }}
        >
          Go Home
        </Button>
      </Grid.Row>
    </Grid>
  );
}
