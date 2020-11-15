const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_BASE_URL = 'https://music-transfer.herokuapp.com';

const REDIRECT_URI = (accType) =>
  `https://music-transfer-api.herokuapp.com/spotify/callback/${accType}`;
const RESPONSE_TYPE = 'code';
const USER_SCOPES = 'user-read-private user-read-email ';
const PLAYLIST_SCOPES =
  'playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private';

const SCOPES = USER_SCOPES + PLAYLIST_SCOPES;

module.exports = {
  SPOTIFY_BASE_URL,
  RESPONSE_TYPE,
  SCOPES,
  REDIRECT_URI,
  CLIENT_BASE_URL,
};
