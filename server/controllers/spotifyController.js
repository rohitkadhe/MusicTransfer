const spotifyUtil = require("../utils/spotifyUtil");
const { SPOTIFY_AUTH_HEADER } = require("../constants/spotifyAPI");

const authenticate = async (req, res, next) => {
  try {
    const account_type = req.params.account_type;
    const redirectUrl = spotifyUtil.generateRedirectUri(account_type);
    return res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const callback = async (req, res, next) => {
  try {
    const account_type = req.params.account_type;
    const code = req.query.code || null;
    const response = await spotifyUtil.getAccessToken(code, account_type);
    const auth = {
      access_token: response.access_token,
    };
    res.redirect(
      `http://localhost:3000/spotify/${account_type}/authenticated#` +
        new URLSearchParams(auth).toString()
    );
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    console.log(req.header(SPOTIFY_AUTH_HEADER));
    const response = await spotifyUtil.getUser(req.header(SPOTIFY_AUTH_HEADER));
    res.send(response);
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
  getUserPlaylists,
  getUserPlaylistSongs,
  createPlaylist,
  searchForSong,
  addSong,
  getUser,
};
