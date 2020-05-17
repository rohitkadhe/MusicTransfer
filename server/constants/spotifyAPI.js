require("../env/env");
const BASE_URL = "https://api.spotify.com/v1/users";
const RESPONSE_TYPE = "code";
const USER_SCOPES = "user-read-private user-read-email ";
const PLAYLIST_SCOPES =
  "playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private";
const SCOPES = USER_SCOPES + PLAYLIST_SCOPES;
const REDIRECT_URI = `http://localhost:${process.env.PORT}/spotify/callback`;
module.exports = { BASE_URL, REDIRECT_URI, RESPONSE_TYPE, SCOPES };
