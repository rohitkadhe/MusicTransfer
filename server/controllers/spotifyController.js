const url = require("url");
const SpotifyAPI = require("../constants/spotifyAPI");
require("../env/env");

const { URLSearchParams } = url;
const { RESPONSE_TYPE, SCOPES, REDIRECT_URI } = SpotifyAPI;

const authenticate = (req, res, next) => {
  const url = "https://accounts.spotify.com/authorize";
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: RESPONSE_TYPE,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  };
  url.search = new URLSearchParams(params).toString();
  res.redirect(url);
};

const callback = (req, res, err, next) => {
  console.log(req.query);
};

module.exports = { authenticate, callback };
