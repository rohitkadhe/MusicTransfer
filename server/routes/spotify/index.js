const express = require("express");
const router = express();
const spotifyController = require("../../controllers/spotifyController");

router.get(
  "/spotify/authenticate/:account_type",
  spotifyController.authenticate
);
router.get("/spotify/callback/:account_type", spotifyController.callback);
router.get(
  "/spotify/:spotify_user_id/playlists",
  spotifyController.getUserPlaylists
);
router.get("/spotify/user", spotifyController.getUser);
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
