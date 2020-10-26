const SpotifyService = require('../services/SpotifyService');

const authenticate = async (req, res, next) => {
  try {
    const account_type = req.params.account_type;
    const redirectUrl = SpotifyService.generateRedirectUri(account_type);
    return res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const callback = async (req, res, next) => {
  try {
    const account_type = req.params.account_type;
    const code = req.query.code || null;
    const response = await SpotifyService.getAccessToken(code, account_type);
    const auth = {
      access_token: response.access_token,
    };
    res.redirect(`http://localhost:3000/spotify/${account_type}/authenticated#` + new URLSearchParams(auth).toString());
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const response = await SpotifyService.getUser(req.token);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
const getUserPlaylists = async (req, res, next) => {
  try {
    const response = await SpotifyService.getUserPlaylists(req.params.spotify_user_id, req.token);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getUserPlaylistSongs = async (req, res, next) => {
  try {
    const response = await SpotifyService.getUserPlaylistSongs(req.params.spotify_playlist_id, req.token);

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const createPlaylist = async (req, res, next) => {
  try {
    const response = await SpotifyService.createPlaylist(req.params.spotify_user_id, req.token, req.body.name);
    res.json(response);
  } catch (error) {
    console.log(error.response);
    next(error);
  }
};

const addSong = async (req, res, next) => {
  try {
    const songUri = req.body.uri;
    const playlistId = req.params.spotify_playlist_id;
    const response = await SpotifyService.addSong(playlistId, songUri, req.token);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const searchForSong = async (req, res, next) => {
  try {
    const songName = req.query.songName;
    const artist = req.query.artist;
    const response = await SpotifyService.searchForSong(req.token, songName, artist);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
  callback,
  getUserPlaylists,
  getUserPlaylistSongs,
  createPlaylist,
  searchForSong,
  addSong,
  getUser,
};
