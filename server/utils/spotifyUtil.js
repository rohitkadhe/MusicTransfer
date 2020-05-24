require("../config/env");
const SpotifyUser = require("../models/Spotify/SpotifyUser");
const {
  RESPONSE_TYPE,
  SCOPES,
  REDIRECT_URI,
} = require("../constants/spotifyAPI");
const URLSearchParams = require("url").URLSearchParams;
const axios = require("axios");
const { AxiosError } = require("../helpers/errorHelper");
const spotifyAPI = require("../constants/spotifyAPI");
const generateRedirectUri = () => {
  const url = "https://accounts.spotify.com/authorize?";
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: RESPONSE_TYPE,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  };
  const queryString = new URLSearchParams(params).toString();
  const redirectUrl = url + queryString;
  return redirectUrl;
};

const getAccessAndRefreshTokens = async (code) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const params = {
    client_id,
    client_secret,
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
  };
  try {
    const queryString = new URLSearchParams(params).toString();
    const tokenUrl = "https://accounts.spotify.com/api/token?";
    const response = await axios.post(tokenUrl, queryString);
    return response.data;
  } catch (error) {
    throw new AxiosError(error);
  }
};

const getNewAccessToken = async (refresh_token) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const params = {
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token,
  };
  const queryString = new URLSearchParams(params).toString();
  const tokenUrl = "https://accounts.spotify.com/api/token?";
  const response = await axios.post(tokenUrl, queryString);
  return response.data;
};

const refreshAccessToken = async (refresh_token) => {
  try {
    return await getNewAccessToken(refresh_token);
  } catch (error) {
    throw new AxiosError(error);
  }
};

const getUser = async (access_token) => {
  const userUrl = "https://api.spotify.com/v1/me";
  const auth = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.get(userUrl, auth);
    const userId = response.data.id;
    const userName = response.data.display_name;
    return new SpotifyUser(userId, userName);
  } catch (error) {
    throw new AxiosError(error);
  }
};

const getUserPlaylists = async (spotify_user_id, access_token) => {
  try {
    const playlistsUrl = `${spotifyAPI.BASE_URL}${spotify_user_id}/playlists`;
    const auth = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const playlists = await axios.get(playlistsUrl, auth);
    return playlists.data;
  } catch (error) {
    throw new AxiosError(error);
  }
};

module.exports = {
  generateRedirectUri,
  refreshAccessToken,
  getAccessAndRefreshTokens,
  getUserPlaylists,
  getUser,
};
