const express = require("express");
const router = express();
const spotifyController = require("../../controllers/spotifyController");

router.get("/spotify/authenticate", spotifyController.authenticate);
router.get("/spotify/callback", spotifyController.callback);
router.get("/spotify/refreshAccessToken", spotifyController.refreshAccessToken);
router.get(
  "/spotify/:spotify_user_id/playlists",
  spotifyController.getUserPlaylists
);
router.post(
  "/spotify/:spotify_user_id/playlists",
  spotifyController.createPlaylist
);
router.get(
  "/spotify/:spotify_user_id/playlists/:spotify_playlist_id/songs",
  spotifyController.getUserPlaylistSongs
);
router.post(
  "/spotify/:spotify_user_id/playlists/:spotify_playlist_id/songs",
  spotifyController.addSong
);
router.get("/spotify/search", spotifyController.searchForSong);

module.exports = router;
