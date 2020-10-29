import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './selectPlaylistsPage.css';
import MusicTransferLoader from '../../loader/MusicTransferLoader';
import AuthService from '../../../services/AuthService';
import { useAxiosGet } from '../../../hooks/useAxios';
import SpotifyLogo from '../../../icons/spotify.png';

export default function SelectPlaylistsPage({ location }) {
  const [srcAcc] = useState(AuthService.getAccFromLocalStorage('srcAcc'));
  const [playlists, setPlaylists] = useState([]);
  const auth = {
    headers: { Authorization: `Bearer ${srcAcc.access_token}` },
  };

  function handleCheckboxClick(e, playlist, index) {
    if (e.target.checked) {
      let newArr = [...playlists, playlist];
      setPlaylists(newArr);
    } else {
      let filteredPlaylists = playlists.filter((p) => p.id !== playlist.id);
      setPlaylists(filteredPlaylists);
    }
  }

  const [response, error, isLoading] = useAxiosGet({ url: `/spotify/${srcAcc.id}/playlists`, config: auth });
  if (isLoading) {
    return <MusicTransferLoader />;
  }
  if (error) {
    return <div>Error</div>;
  } else {
    const renderResults = response.map((playlist, index) => {
      const imageUrl = playlist.images.length === 3 ? playlist.images[2].url : SpotifyLogo;
      return (
        <div className="item" key={playlist.id}>
          <img className="ui tiny circular image" alt="Spotify Playlist Logos" src={imageUrl} />
          <div className="content" id="list-text">
            {playlist.name}
          </div>
          <div className="right floated content" id="vertically-center">
            <div className="ui toggle checkbox">
              <input id="toggle-input" type="checkbox" tabIndex="0" onChange={(e) => handleCheckboxClick(e, playlist, index)} />
              <label></label>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="ui container header" id="header-text">
          Select Playlists To Transfer
        </div>
        <div className="ui segment container">
          <div className="ui middle aligned relaxed divided list">{renderResults}</div>
        </div>
        <div className="ui container">
          <Link
            className={`ui green huge button ${Object.keys(playlists).length === 0 ? ' disabled' : ''}`}
            to={{
              pathname: '/selectDestination',
              state: { prevPath: location.pathname },
            }}
            onClick={() => {
              localStorage.setItem('selectedPlaylists', JSON.stringify(playlists));
            }}
          >
            Next<i aria-hidden="true" className="right arrow icon"></i>
          </Link>
        </div>
      </>
    );
  }
}
