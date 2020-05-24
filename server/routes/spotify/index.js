const express = require("express");
const router = express();
const verifyAuth = require("../../middlewares/auth");
const spotifyController = require("../../controllers/spotifyController");

router.get("/spotify/authenticate", verifyAuth, spotifyController.authenticate);
router.get("/spotify/callback", spotifyController.callback);
router.get("/spotify/refreshToken", verifyAuth, spotifyController.refreshToken);
router.get(
  "/spotify/:spotify_user_id/playlists",
  verifyAuth,
  spotifyController.getUserPlaylists
);
module.exports = router;
