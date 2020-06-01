require("../config/env");
const SpotifyUser = require("../models/Spotify/SpotifyUser");
const SpotifyPlaylist = require("../models/Spotify/SpotifyPlaylist");
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

  const queryParams = {
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const tokenUrl = "https://accounts.spotify.com/api/token?";
  const response = await axios.post(tokenUrl, queryString);
  return response.data;
};

const refreshAccessToken = async (refresh_token) => {
  try {
    return await getNewAccessToken(refresh_token);
  } catch (error) {
    console.log(error);
    throw new AxiosError(error);
  }
};

const getUser = async (access_token) => {
  const userUrl = `${spotifyAPI.BASE_URL}/me`;
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
    const playlistsUrl = `${spotifyAPI.BASE_URL}/users/${spotify_user_id}/playlists`;
    const auth = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const playlists = await axios.get(playlistsUrl, auth);
    const items = playlists.data.items;
    const usersPlaylists = items.filter(
      (item) => item.owner.id === spotify_user_id
    );
    const mappedPlaylists = usersPlaylists.map((playlist) => {
      const { id, name, owner, images } = playlist;
      return new SpotifyPlaylist(id, name, owner.display_name, images);
    });
    return mappedPlaylists;
  } catch (error) {
    throw new AxiosError(error);
  }
};

const getUserPlaylistSongs = async (spotify_playlist_id, access_token) => {
  try {
    const playlistSongsUrl = `${spotifyAPI.BASE_URL}/playlists/${spotify_playlist_id}/tracks`;

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        fields: "items(track(name, album(name, images, artists), id, uri))",
      },
    };
    const songs = await axios.get(playlistSongsUrl, config);
    return songs.data;
  } catch (error) {
    throw new AxiosError(error);
  }
};

const createPlaylist = async (spotify_user_id, access_token, playlistName) => {
  try {
    const createPlaylistsUrl = `${spotifyAPI.BASE_URL}/users/${spotify_user_id}/playlists`;
    const auth = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const params = {
      name: playlistName,
    };
    const playlists = await axios.post(createPlaylistsUrl, params, auth);
    return playlists.data;
  } catch (error) {
    throw new AxiosError(error);
  }
};

const searchForSong = async (access_token, songName, artist) => {
  try {
    const searchSongUrl = `${spotifyAPI.BASE_URL}/search?`;
    const searchQuery = `track:${songName} artist:${artist}`;
    const queryParams = {
      q: searchQuery,
      type: "track",
      limit: "1",
      market: "from_token",
    };
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: queryParams,
    };
    const song = await axios.get(searchSongUrl, config);
    return song.data;
  } catch (error) {
    throw new AxiosError(error);
  }
};

module.exports = {
  generateRedirectUri,
  refreshAccessToken,
  getAccessAndRefreshTokens,
  getUser,
  getUserPlaylists,
  getUserPlaylistSongs,
  createPlaylist,
  searchForSong,
};
