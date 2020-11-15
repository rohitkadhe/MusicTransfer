const SpotifyService = require('../services/SpotifyService');
const { CLIENT_BASE_URL } = require('../constants/spotifyAPI');
const authenticate = async (req, res, next) => {
  try {
    const accType = req.params.accType;
    const redirectUrl = SpotifyService.generateRedirectUri(accType);
    return res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const callback = async (req, res, next) => {
  const accType = req.params.accType;
  try {
    const code = req.query.code || null;
    const response = await SpotifyService.getAccessToken(code, accType);
    const auth = {
      access_token: response.access_token,
    };
    res.redirect(
      `${CLIENT_BASE_URL}/spotify/${accType}/authenticated#` + new URLSearchParams(auth).toString(),
    );
  } catch (error) {
    res.redirect(`${CLIENT_BASE_URL}/spotify/${accType}/error=access_denied`);
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
    const response = await SpotifyService.getUserPlaylistSongs(req.params, req.query, req.token);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const createPlaylist = async (req, res, next) => {
  try {
    const response = await SpotifyService.createPlaylist(
      req.params.spotify_user_id,
      req.token,
      req.body.name,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const addSongs = async (req, res, next) => {
  try {
    const songUris = req.body.uris;
    const playlistId = req.params.spotify_playlist_id;
    const response = await SpotifyService.addSongs(playlistId, songUris, req.token);
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
  addSongs,
  getUser,
};
