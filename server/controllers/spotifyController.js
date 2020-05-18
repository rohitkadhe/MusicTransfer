require("../config/env");
const url = require("url");
const SpotifyAPI = require("../constants/spotifyAPI");
const { URLSearchParams } = url;
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;
const HttpErrors = require("../constants/httpErrors");
const { RESPONSE_TYPE, SCOPES, REDIRECT_URI } = SpotifyAPI;
var axios = require("axios");

const authenticate = async (req, res, next) => {
  try {
    const url = "https://accounts.spotify.com/authorize?";
    const params = {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: RESPONSE_TYPE,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
    };
    let queryString = new URLSearchParams(params).toString();
    let redirectUrl = url + queryString;
    res.redirect(redirectUrl);
  } catch (err) {
    throw new MusicTransferError(err.message, HttpErrors.UNAUTHORIZED);
  }
};

const callback = async (req, res, next) => {
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  var code = req.query.code || null;
  const params = {
    client_id,
    client_secret,
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
  };
  let queryString = new URLSearchParams(params).toString();
  axios
    .post("https://accounts.spotify.com/api/token", queryString)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};
module.exports = { authenticate, callback };
