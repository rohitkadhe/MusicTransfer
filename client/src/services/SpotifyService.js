import ax from '../axios/axios';
import {
  sourceAccount,
  destinationAccount,
  userPlaylistRoute,
  playlistSongsRoute,
  addSongsToPlaylistRoute,
} from '../constants/strings';

import SessionStorageService from './SessionStorageService';

class SpotifyService {
  constructor() {
    this.srcAcc = SessionStorageService.get(sourceAccount);
    this.destAcc = SessionStorageService.get(destinationAccount);
  }
  getAccount(accType) {
    if (this.srcAcc === null || this.destAcc === null) {
      this.srcAcc = SessionStorageService.get(sourceAccount);
      this.destAcc = SessionStorageService.get(destinationAccount);
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

  async getPlaylistSongs(accType, playlist) {
    let acc = this.getAccount(accType);
    let offset = 0;
    let songsRemaining = 1;
    let res = [];
    while (songsRemaining > 0) {
      let resp = await ax.get(
        playlistSongsRoute(acc.id, playlist.id, offset),
        this.getAuth(accType),
      );
      let fetchedSongs = resp.data.songs;
      songsRemaining = fetchedSongs.length;
      offset += 100;
      if (songsRemaining > 0) {
        res = [...res, ...fetchedSongs];
      }
    }
    return res;
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
    const auth = {
      headers: { Authorization: `Bearer ${destAcc.access_token}` },
    };
    try {
      let songs = await this.getPlaylistSongs(fromAccType, srcAccPlaylist);
      let destPlaylist = await this.createPlaylist(toAccType, srcAccPlaylist.name);
      let uriArray = this.getSongUriArray(songs);
      let from = 0;
      let to = Math.min(uriArray.length, 100);

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
