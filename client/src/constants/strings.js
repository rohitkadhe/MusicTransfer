// Account types
const sourceAccount = 'srcAcc';
const destinationAccount = 'destAcc';

//Session storage keys
const selectedPlaylistsKey = 'selectedPlaylists';

//Services page
const selectSourceAccount = 'Select the Source Account';
const selectDestinationAccount = 'Select the Destination Account';
const authPopupTitle = 'Login with Spotify';

//Select Playlists page
const selectPlaylists = 'Select Playlists To Transfer';

//Transfer Songs Page
const transferring = 'Transferring...';
const allDone = 'All done! You may now close this window';
const warningText = 'Please do not close or refresh this window';

//Routes Front End
const homeRoute = '/';
const transferSongsRoute = `/destAcc/spotify/transfer`;
const selectSourceRoute = '/selectSource';
const selectDestinationRoute = '/selectDestination';
const spotifyAuthRedirectRoute = '/spotify/:accType/:access_token';
const selectPlaylistsRoute = '/srcAcc/spotify/:spotify_user_id/playlists';
const errorRoute = '/error';
//Routes Back End
const authRoute = (accType) => `http://localhost:5433/spotify/authenticate/${accType}`;
const playlistSongsRoute = (spotifyUserId, playlistId, offset) =>
  `spotify/${spotifyUserId}/playlists/${playlistId}/songs?offset=${offset}`;
const userPlaylistRoute = (spotifyUserId) => `/spotify/${spotifyUserId}/playlists`;
const addSongsToPlaylistRoute = (spotifyUserId, playlistId) =>
  `spotify/${spotifyUserId}/playlists/${playlistId}/songs`;

export {
  authRoute,
  authPopupTitle,
  sourceAccount,
  destinationAccount,
  selectedPlaylistsKey,
  homeRoute,
  transferSongsRoute,
  selectSourceRoute,
  selectDestinationRoute,
  selectPlaylistsRoute,
  spotifyAuthRedirectRoute,
  playlistSongsRoute,
  userPlaylistRoute,
  addSongsToPlaylistRoute,
  selectSourceAccount,
  selectDestinationAccount,
  transferring,
  allDone,
  warningText,
  selectPlaylists,
  errorRoute,
};
