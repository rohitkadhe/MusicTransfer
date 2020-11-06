import React from 'react';
import SpotifyService from '../../../services/SpotifyService';
import { Progress, Header, Container, Message, Button } from 'semantic-ui-react';

export default class TransferSongsPage extends React.Component {
  constructor(props) {
    const selectedPlaylists = JSON.parse(sessionStorage.getItem('selectedPlaylists'));

    super(props);
    this.state = {
      error: '',
      transferConfirmed: false,
      progress: 0,
      warningText: 'Please do not close or refresh this window',
      progressText: 'Transferring...',
      selectedPlaylists: selectedPlaylists,
      totalPlaylists: selectedPlaylists.length,
    };
  }

  onUnload = (e) => {
    e.returnValue = '';
    return null;
  };

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
  }

  async transferSelectedSongs() {
    let { selectedPlaylists } = this.state;
    for (let index = 0; index < selectedPlaylists.length; index++) {
      await SpotifyService.transferPlaylistSongs('srcAcc', 'destAcc', selectedPlaylists[index]);
      let prog = Math.round(((index + 1) / selectedPlaylists.length) * 100);
      this.setState({ progress: prog });
    }
    this.setState({
      progressText: 'All done! You may now close this window',
      transferComplete: true,
    });
    window.removeEventListener('beforeunload', this.onUnload);
    sessionStorage.clear();
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

    if (error) {
      return <div> Error</div>;
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
