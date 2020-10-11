require("../config/env");
const BASE_URL = "https://api.spotify.com/v1";
const CLIENT_REDIRECT_URI = "http://localhost:3000/spotify/authenticated/#";

const RESPONSE_TYPE = "code";
const USER_SCOPES = "user-read-private user-read-email ";
const PLAYLIST_SCOPES =
  "playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private";

const SCOPES = USER_SCOPES + PLAYLIST_SCOPES;
const REDIRECT_URI = `http://localhost:${process.env.PORT}/spotify/callback`;
const SPOTIFY_AUTH_HEADER = "spotifyAuthToken";

module.exports = {
  BASE_URL,
  CLIENT_REDIRECT_URI,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPES,
  SPOTIFY_AUTH_HEADER,
};
