import ax from '../axios/axios';
import {
  sourceAccount,
  destinationAccount,
  userPlaylistRoute,
  playlistSongsRoute,
  addSongsToPlaylistRoute,
} from '../constants/strings';

class SpotifyService {
  constructor() {
    this.srcAcc = JSON.parse(sessionStorage.getItem(sourceAccount));
    this.destAcc = JSON.parse(sessionStorage.getItem(destinationAccount));
  }
  getAccount(accType) {
    if (this.srcAcc === null || this.destAcc === null) {
      this.srcAcc = JSON.parse(sessionStorage.getItem(sourceAccount));
      this.destAcc = JSON.parse(sessionStorage.getItem(destinationAccount));
    }
    let acc = accType === sourceAccount ? this.srcAcc : this.destAcc;
    return acc;
  }
  getAuth(accType) {
    let acc = this.getAccount(accType);
    return {
      headers: { Authorization: `Bearer ${acc.access_token}` },
    };
  }
  async getPlaylists(accType) {
    let acc = this.getAccount(accType);
    let url = userPlaylistRoute(acc.id);
    const resp = await ax.get(url, this.getAuth(accType));
    return resp.data;
  }

  async getPlaylistSongs(accType, playlist, offset = 0) {
    let acc = this.getAccount(accType);
    let url = playlistSongsRoute(acc.id, playlist.id, offset);
    let resp = await ax.get(url, this.getAuth(accType));
    return resp.data.songs;
  }

  async createPlaylist(accType, name) {
    let acc = this.getAccount(accType);
    let url = userPlaylistRoute(acc.id);
    let resp = await ax.post(url, { name: name }, this.getAuth(accType));
    return resp.data;
  }

  getSongUriArray = (songs) => {
    return songs.map((song) => {
      if (song.uri === undefined) {
        return [];
      }
      return song.uri;
    });
  };

  async transferPlaylistSongs(fromAccType, toAccType, srcAccPlaylist) {
    let destAcc = this.getAccount(toAccType);
    console.log(destAcc);
    const auth = {
      headers: { Authorization: `Bearer ${destAcc.access_token}` },
    };
    let songs = await this.getPlaylistSongs(fromAccType, srcAccPlaylist);
    let destPlaylist = await this.createPlaylist(toAccType, srcAccPlaylist.name);
    let uriArray = this.getSongUriArray(songs);
    let from = 0;
    let to = Math.min(uriArray.length, 100);

    try {
      while (from < uriArray.length) {
        let body = {};
        let uris = uriArray.slice(from, to);
        body.uris = uris;
        await ax.post(addSongsToPlaylistRoute(destAcc.id, destPlaylist.id), body, auth);
        from = to;
        to = Math.min(to + 100, uriArray.length);
      }
    } catch (error) {
      return error;
    }
  }
}

export default new SpotifyService();
