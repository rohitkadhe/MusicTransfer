require('../config/env');
const SpotifyUser = require('../models/Spotify/SpotifyUser');
const SpotifyPlaylist = require('../models/Spotify/SpotifyPlaylist');
const { RESPONSE_TYPE, SCOPES } = require('../constants/spotifyAPI');
const URLSearchParams = require('url').URLSearchParams;
const axios = require('axios');
const spotifyAPI = require('../constants/spotifyAPI');
const SpotifyArtist = require('../models/Spotify/SpotifyArtist');
const SpotifyAlbum = require('../models/Spotify/SpotifyAlbum');
const SpotifySong = require('../models/Spotify/SpotifySong');

const generateRedirectUri = (account_type) => {
  const url = 'https://accounts.spotify.com/authorize?';
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: RESPONSE_TYPE,
    redirect_uri: `http://localhost:${process.env.PORT}/spotify/callback/${account_type}`,
    scope: SCOPES,
    show_dialog: true,
  };
  const queryString = new URLSearchParams(params).toString();
  const redirectUrl = url + queryString;
  return redirectUrl;
};

const getAccessToken = async (code, account_type) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const params = {
    client_id,
    client_secret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: `http://localhost:${process.env.PORT}/spotify/callback/${account_type}`,
  };

  const queryString = new URLSearchParams(params).toString();
  const tokenUrl = 'https://accounts.spotify.com/api/token?';
  const response = await axios.post(tokenUrl, queryString);
  return response.data;
};

const getUser = async (access_token) => {
  const userUrl = `${spotifyAPI.BASE_URL}/me`;
  const auth = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(userUrl, auth);
  const userId = response.data.id;
  const userName = response.data.display_name;
  return new SpotifyUser(userId, userName);
};

const getUserPlaylists = async (spotify_user_id, access_token) => {
  const playlistsUrl = `${spotifyAPI.BASE_URL}/users/${spotify_user_id}/playlists`;
  const auth = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const playlists = await axios.get(playlistsUrl, auth);
  const items = playlists.data.items;
  const usersPlaylists = items.filter((item) => item.owner.id === spotify_user_id);
  const mappedPlaylists = usersPlaylists.map((playlist) => {
    const { id, name, owner, images } = playlist;
    return new SpotifyPlaylist(id, name, owner.display_name, images);
  });
  return mappedPlaylists;
};

const getUserPlaylistSongs = async (spotify_playlist_id, access_token) => {
  const playlistSongsUrl = `${spotifyAPI.BASE_URL}/playlists/${spotify_playlist_id}/tracks`;

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      fields: 'items(track(name, album(id, name, images, artists), id, uri))',
    },
  };
  const songs = await axios.get(playlistSongsUrl, config);
  const songsData = songs.data;

  const mappedSongs = songsData.items.map((song) => {
    const { track } = song;
    const { album } = track;
    const spotifyArtists = album.artists.map((artist) => {
      const { id, name, uri } = artist;
      return new SpotifyArtist(id, name, uri);
    });
    const spotifyAlbum = new SpotifyAlbum(album.id, album.name, spotifyArtists, album.images);
    return new SpotifySong(track.id, track.name, track.uri, spotifyArtists, spotifyAlbum);
  });
  return { songs: mappedSongs };
};

const createPlaylist = async (spotify_user_id, access_token, playlistName) => {
  const createPlaylistsUrl = `${spotifyAPI.BASE_URL}/users/${spotify_user_id}/playlists`;
  const auth = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const params = {
    name: playlistName,
  };
  const playlistData = await axios.post(createPlaylistsUrl, params, auth);
  const { id, name, owner, images } = playlistData.data;
  const spotifyPlaylist = new SpotifyPlaylist(id, name, new SpotifyUser(owner.id, owner.display_name), images);
  return spotifyPlaylist;
};

const searchForSong = async (access_token, songName, artist) => {
  const searchSongUrl = `${spotifyAPI.BASE_URL}/search?`;
  const searchQuery = `track:${songName} artist:${artist}`;
  const queryParams = {
    q: searchQuery,
    type: 'track',
    limit: '1',
    market: 'from_token',
  };
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: queryParams,
  };
  const song = await axios.get(searchSongUrl, config);
  const songData = song.data;

  const { items } = songData.tracks;
  const mappedSongs = items.map((song) => {
    const { album, artists } = song;
    const spotifyArtists = artists.map((artist) => {
      const { id, name, uri } = artist;
      return new SpotifyArtist(id, name, uri);
    });
    const spotifyAlbum = new SpotifyAlbum(album.id, album.name, spotifyArtists, album.images);
    return new SpotifySong(song.id, song.name, song.uri, spotifyArtists, spotifyAlbum);
  });
  return { songs: mappedSongs };
};

const addSong = async (playlistId, uris, access_token) => {
  const addSongUrl = `${spotifyAPI.BASE_URL}/playlists/${playlistId}/tracks`;
  const auth = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const params = {
    uris: [uris[0]],
  };
  const response = await axios.post(addSongUrl, params, auth);
  return response.data;
};

module.exports = {
  generateRedirectUri,
  getAccessToken,
  getUser,
  getUserPlaylists,
  getUserPlaylistSongs,
  createPlaylist,
  searchForSong,
  addSong,
};
