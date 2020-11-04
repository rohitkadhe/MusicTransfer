import React from 'react';
import AuthService from '../../../services/AuthService';
import { Progress, Header, Container, Message } from 'semantic-ui-react';
import ax from '../../../axios/axios';

export default class TransferSongsPage extends React.Component {
  constructor(props) {
    const srcAcc = AuthService.getAccFromLocalStorage('srcAcc');
    const destAcc = AuthService.getAccFromLocalStorage('destAcc');
    const selectedPlaylists = Object.values(JSON.parse(localStorage.getItem('selectedPlaylists')));

    super(props);
    this.state = {
      error: '',
      isLoading: false,
      progress: 0,
      warningText: 'Please do not close or refresh this window',
      progressText: 'Transferring...',
      selectedPlaylists: selectedPlaylists,
      totalPlaylists: selectedPlaylists.length,
      srcAcc: srcAcc,
      destAcc: destAcc,
    };
  }

  async componentDidMount() {
    const { selectedPlaylists } = this.state;
    this.setState({ isLoading: true });
    for (let index = 0; index < selectedPlaylists.length; index++) {
      await this.transferSongs(selectedPlaylists[index]);
      let prog = ((index + 1) / selectedPlaylists.length) * 100;
      this.setState({ progress: prog });
    }
    this.setState({ isLoading: false, progressText: 'All done! You may now close this window' });
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

  transferSongs = async (srcAccPlaylist) => {
    const { destAcc } = this.state;
    const auth = {
      headers: { Authorization: `Bearer ${destAcc.access_token}` },
    };
    let songs = await this.fetchPlaylistSongs(srcAccPlaylist);
    let destPlaylist = await this.createDestAccPlaylist(srcAccPlaylist);

    this.setState({
      currentTransferDestPlaylist: ['destPlaylist'],
      currentTransferSongs: ['songs'],
    });
    let uriArray = this.getSongUriArray(songs);
    let from = 0;
    let to = Math.min(uriArray.length, 100);

    while (from < uriArray.length) {
      let body = {};
      let uris = uriArray.slice(from, to);
      console.log('Spliced array', uris);
      body.uris = uris;
      let resp = await ax.post(
        `spotify/${destAcc.id}/playlists/${destPlaylist.id}/songs`,
        body,
        auth,
      );
      from = to;
      to = Math.min(to + 100, uriArray.length);
    }
  };
  render() {
    const { isLoading, error, progress, progressText, warningText } = this.state;
    if (error) {
      return <div> Error</div>;
    }
    return (
      <Container>
        <Message hidden={!isLoading} color="red">
          <Message.Header>{warningText}</Message.Header>
        </Message>

        <Header style={{ marginTop: '3em' }} as="h1">
          {progressText}
        </Header>

        <Progress indicating={isLoading} percent={progress} progress color="green" />
      </Container>
    );
  }
}
