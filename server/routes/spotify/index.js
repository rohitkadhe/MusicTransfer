const express = require('express');
const router = express();
const spotifyController = require('../../controllers/spotifyController');
const verifyToken = require('../../middlewares/auth');

router.get('/spotify/authenticate/:account_type', spotifyController.authenticate);
router.get('/spotify/callback/:account_type', spotifyController.callback);
router.get('/spotify/:spotify_user_id/playlists', verifyToken, spotifyController.getUserPlaylists);
router.get('/spotify/user', verifyToken, spotifyController.getUser);
router.post('/spotify/:spotify_user_id/playlists', verifyToken, spotifyController.createPlaylist);
router.get('/spotify/:spotify_user_id/playlists/:spotify_playlist_id/songs', verifyToken, spotifyController.getUserPlaylistSongs);

router.post('/spotify/:spotify_user_id/playlists/:spotify_playlist_id/songs', verifyToken, spotifyController.addSongs);
router.get('/spotify/search', verifyToken, spotifyController.searchForSong);

module.exports = router;
