const spotifyUtil = require("../utils/spotifyUtil");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;
const { UNAUTHORIZED } = require("../constants/httpErrors");
const { SPOTIFY_AUTH_HEADER } = require("../constants/spotifyAPI");

const authenticate = async (req, res, next) => {
  try {
    const redirectUrl = spotifyUtil.generateRedirectUri();
    res.redirect(redirectUrl);
  } catch (err) {
    next(new MusicTransferError(err.message, UNAUTHORIZED));
  }
};

const callback = async (req, res, next) => {
  try {
    const code = req.query.code || null;
    const response = await spotifyUtil.getAccessAndRefreshTokens(code);
    const user = await spotifyUtil.getUser(response.access_token);
    res.json({ user, response });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const response = await spotifyUtil.refreshAccessToken(
      req.header(SPOTIFY_AUTH_HEADER)
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const getUserPlaylists = async (req, res, next) => {
  try {
    const response = await spotifyUtil.getUserPlaylists(
      req.params.spotify_user_id,
      req.header(SPOTIFY_AUTH_HEADER)
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getUserPlaylistSongs = async (req, res, next) => {
  try {
    const response = await spotifyUtil.getUserPlaylistSongs(
      req.params.spotify_playlist_id,
      req.header(SPOTIFY_AUTH_HEADER)
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const createPlaylist = async (req, res, next) => {
  try {
    const response = await spotifyUtil.createPlaylist(
      req.params.spotify_user_id,
      req.header(SPOTIFY_AUTH_HEADER),
      req.body.name
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const addSong = async (req, res, next) => {
  try {
    const songUri = req.body.uri;
    const playlistId = req.params.spotify_playlist_id;
    const response = await spotifyUtil.addSong(
      playlistId,
      songUri,
      req.header(SPOTIFY_AUTH_HEADER)
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const searchForSong = async (req, res, next) => {
  try {
    const songName = req.query.songName;
    const artist = req.query.artist;
    const response = await spotifyUtil.searchForSong(
      req.header(SPOTIFY_AUTH_HEADER),
      songName,
      artist
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
  callback,
  refreshAccessToken,
  getUserPlaylists,
  getUserPlaylistSongs,
  createPlaylist,
  searchForSong,
  addSong,
};
