# Music Transfer

- Objective of this project is to allow users to transfer/share songs between Spotify Accounts easily

# Website Flow

### Landing Page

  <img src="screenshots/landingPage.JPG" style="margin-bottom:10px margin-top: 10px" >
  
  ### Select Source Account Page
  <img src="screenshots/selectSourcePage.JPG" style="margin-bottom:10px margin-top: 10px"> 
  
  ### Select Playlists Page
  <img src="screenshots/selectPlaylistsPage.JPG" style="margin-bottom:10px margin-top: 10px"> 
  <img src="screenshots/selectPlaylistsPage2.JPG" style="margin-bottom:10px margin-top: 10px">
  
  ### Select Destination Account Page
  <img src="screenshots/selectDestinationPage.JPG" style="margin-bottom:10px margin-top: 10px">
  
  ### Transfer Page 
  <img src="screenshots/transferPageProgress.JPG" style="margin-bottom:10px margin-top: 10px">
  <img src="screenshots/transferPageReloadWarning.JPG" style="margin-bottom:10px margin-top: 10px"> 
  <img src="screenshots/transferPageComplete.JPG" style="margin-bottom:10px margin-top: 10px">

# Running the project locally

## Prerequisites

- In the server directory configure the .env.example file with your client_id and client_secret
- Make sure you don't have quotes around your client_id and client_secret
- Rename the .env.example file to .env

## Running the server locally

- Change the REDIRECT_URI in spotifyAPI.js file in the constants folder to "http://localhost:5433/spotify/callback/${accType}"
- Change CLIENT_BASE_URL to "http://localhost:3000"
- Open a terminal of choice
- Change directories into the project directory then into the 'server' directory
- Type 'npm run dev'

## Running the client locally

- Change BASE_URL in the strings.js file in the constants folder from "https://music-transfer-api.herokuapp.com" to "http://localhost:5433"
- Open a terminal of choice
- Change directories into the project directory then into the 'client' directory
- Type 'npm start'
