const express = require("express");
const router = express();
const verifyAuth = require("../../middlewares/auth");
const spotifyController = require("../../controllers/spotifyController");

router.get("/spotify/authenticate", spotifyController.authenticate);
router.get("/spotify/callback", spotifyController.callback);
router.get("/spotify/refreshToken", verifyAuth, spotifyController.refreshToken);
router.get(
  "/spotify/:spotify_user_id/playlists",
  verifyAuth,
  spotifyController.getUserPlaylists
);
router.post(
  "/spotify/:spotify_user_id/playlists",
  verifyAuth,
  spotifyController.createPlaylist
);
router.get(
  "/spotify/:spotify_user_id/playlists/:spotify_playlist_id/songs",
  verifyAuth,
  spotifyController.getUserPlaylistSongs
);

router.get("/spotify/search", verifyAuth, spotifyController.searchForSong);
module.exports = router;
