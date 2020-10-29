import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './confirmTransferPage.css';
import SpotifyLogo from '../../../icons/spotify.png';

export default function SelectPlaylistsPage({ location }) {
  const playlists = JSON.parse(localStorage.getItem('selectedPlaylists'));
  const [numCheckedBoxes, setNumCheckedBoxes] = useState(0);
  const renderResults = playlists.map((playlist) => {
    const imageUrl = playlist.images.length === 3 ? playlist.images[2].url : SpotifyLogo;
    return (
      <div className="item" key={playlist.id}>
        <img className="ui tiny circular image" alt="Spotify Playlist Logos" src={imageUrl} />
        <div className="content" id="list-text">
          {playlist.name}
        </div>
        <div className="right floated content" id="vertically-center">
          <div className="ui toggle checkbox">
            <input id="toggle-input" type="checkbox" tabIndex="0" onChange={(e) => handleCheckboxClick(e, playlist)} />
            <label></label>
          </div>
        </div>
      </div>
    );
  });
  function handleCheckboxClick(e, playlist) {
    if (e.target.checked) {
      setNumCheckedBoxes(numCheckedBoxes + 1);
    } else {
      setNumCheckedBoxes(numCheckedBoxes - 1);
    }
  }

  return (
    <>
      <div className="ui container header" id="header-text">
        Confirm Playlists To Transfer
      </div>
      <div className="ui container segment">
        <div className="ui middle aligned relaxed divided list">{renderResults}</div>
      </div>
      <div className="ui container">
        <Link
          className={`ui green huge button ${Object.keys(playlists).length !== numCheckedBoxes ? ' disabled' : ''}`}
          to={{
            pathname: '/transfer',
            state: { prevPath: location.pathname, selectedPlaylists: { ...playlists } },
          }}
        >
          Confirm Transfer<i aria-hidden="true" className="right arrow icon"></i>
        </Link>
      </div>
    </>
  );
}
