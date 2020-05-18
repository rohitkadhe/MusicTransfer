const express = require("express");
const router = express();
const verifyAuth = require("../../middlewares/auth");
const spotifyController = require("../../controllers/spotifyController");

router.get("/spotify/authenticate", spotifyController.authenticate);
router.get("/spotify/callback", spotifyController.callback);
module.exports = router;
