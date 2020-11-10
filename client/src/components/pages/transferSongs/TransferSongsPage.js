import React from 'react';
import SpotifyService from '../../../services/SpotifyService';
import { Progress, Header, Container, Message, Button } from 'semantic-ui-react';
import {
  sourceAccount,
  destinationAccount,
  transferring,
  allDone,
  warningText,
  selectedPlaylistsKey,
  errorRoute,
} from '../../../constants/strings';
import SessionStorageService from '../../../services/SessionStorageService';

export default class TransferSongsPage extends React.Component {
  constructor(props) {
    let selectedPlaylists = SessionStorageService.get(selectedPlaylistsKey);
    let length = selectedPlaylists !== null ? selectedPlaylists.length : 0;
    super(props);
    this.state = {
      error: '',
      transferConfirmed: false,
      progress: 0,
      warningText: warningText,
      progressText: transferring,
      selectedPlaylists: selectedPlaylists || [],
      totalPlaylists: length,
    };
  }

  onUnload = (e) => {
    e.returnValue = '';
    return null;
  };

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }

  async transferSelectedSongs() {
    let { selectedPlaylists } = this.state;
    for (let index = 0; index < selectedPlaylists.length; index++) {
      try {
        await SpotifyService.transferPlaylistSongs(
          sourceAccount,
          destinationAccount,
          selectedPlaylists[index],
        );
        let prog = Math.round(((index + 1) / selectedPlaylists.length) * 100);
        this.setState({ progress: prog });
      } catch (err) {
        this.setState({ error: err.response });
      }
    }
    this.setState({
      progressText: allDone,
      transferComplete: true,
      progress: 100,
    });
    window.removeEventListener('beforeunload', this.onUnload);
    SessionStorageService.clear();
  }

  renderConfirmButton() {
    const { transferConfirmed } = this.state;
    if (!transferConfirmed) {
      return (
        <Button
          color="green"
          size="large"
          onClick={async () => {
            this.setState({ transferConfirmed: true });
            window.addEventListener('beforeunload', this.onUnload);
            await this.transferSelectedSongs();
          }}
        >
          Confirm Transfer
        </Button>
      );
    }
    return <></>;
  }
  render() {
    const {
      error,
      warningText,
      transferComplete,
      progress,
      progressText,
      transferConfirmed,
    } = this.state;
    const { history } = this.props;
    if (error) {
      return history.push({
        pathname: errorRoute,
        state: {
          status: error.data.status,
          message: error.data.message,
        },
      });
    }
    return (
      <Container>
        <Message hidden={!transferConfirmed || transferComplete} color="red">
          <Message.Header>{warningText}</Message.Header>
        </Message>

        <Header hidden={!transferConfirmed} style={{ marginTop: '3em' }} as="h1">
          {progressText}
        </Header>

        <Progress
          disabled={!transferConfirmed}
          indicating={!transferComplete}
          percent={progress}
          progress
          color="green"
          style={{ marginTop: '3em' }}
        />
        {this.renderConfirmButton()}
      </Container>
    );
  }
}
