require("../config/env");
const BASE_URL = "https://api.spotify.com/v1";

const RESPONSE_TYPE = "code";
const USER_SCOPES = "user-read-private user-read-email ";
const PLAYLIST_SCOPES =
  "playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private";

const SCOPES = USER_SCOPES + PLAYLIST_SCOPES;
const SPOTIFY_AUTH_HEADER = "spotifyAuthToken";

module.exports = {
  BASE_URL,
  RESPONSE_TYPE,
  SCOPES,
  SPOTIFY_AUTH_HEADER,
};
