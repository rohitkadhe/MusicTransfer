import React from 'react';
import AuthService from '../../../services/AuthService';
import { Progress, Header, Container, Message, Button } from 'semantic-ui-react';
import ax from '../../../axios/axios';

export default class TransferSongsPage extends React.Component {
  constructor(props) {
    const srcAcc = AuthService.getAccFromSessionStorage('srcAcc');
    const destAcc = AuthService.getAccFromSessionStorage('destAcc');
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
      srcAcc: srcAcc,
      destAcc: destAcc,
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

  createDestAccPlaylist = async (playlist) => {
    const { destAcc } = this.state;
    let createdPlaylist = {};
    const auth = {
      headers: { Authorization: `Bearer ${destAcc.access_token}` },
    };

    try {
      let resp = await ax.post(`spotify/${destAcc.id}/playlists`, { name: playlist.name }, auth);
      createdPlaylist = resp.data;
    } catch (error) {
      this.setState({ error: error });
    }

    return createdPlaylist;
  };

  fetchPlaylistSongs = async (playlist) => {
    const { srcAcc } = this.state;
    let res = [];
    const auth = {
      headers: { Authorization: `Bearer ${srcAcc.access_token}` },
    };
    let offset = 0;
    let songsRemaining = 1;

    try {
      while (songsRemaining !== 0) {
        let resp = await ax.get(
          `spotify/${srcAcc.id}/playlists/${playlist.id}/songs?offset=${offset}`,
          auth,
        );
        let fetchedSongs = resp.data.songs;
        songsRemaining = fetchedSongs.length;
        offset += 100;
        if (songsRemaining > 0) {
          res = [...res, ...fetchedSongs];
        }
      }
    } catch (error) {
      this.setState({ error: error });
    }
    return res;
  };

  getSongUriArray = (songs) => {
    return songs.map((song) => {
      if (song.uri === undefined) {
        return [];
      }
      return song.uri;
    });
  };

  transferPlaylistSongs = async (srcAccPlaylist) => {
    const { destAcc } = this.state;
    const auth = {
      headers: { Authorization: `Bearer ${destAcc.access_token}` },
    };
    let songs = await this.fetchPlaylistSongs(srcAccPlaylist);
    let destPlaylist = await this.createDestAccPlaylist(srcAccPlaylist);
    let uriArray = this.getSongUriArray(songs);
    let from = 0;
    let to = Math.min(uriArray.length, 100);
    try {
      while (from < uriArray.length) {
        let body = {};
        let uris = uriArray.slice(from, to);
        body.uris = uris;
        await ax.post(`spotify/${destAcc.id}/playlists/${destPlaylist.id}/songs`, body, auth);
        from = to;
        to = Math.min(to + 100, uriArray.length);
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  async transferSelectedSongs() {
    let { selectedPlaylists } = this.state;
    for (let index = 0; index < selectedPlaylists.length; index++) {
      await this.transferPlaylistSongs(selectedPlaylists[index]);
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
