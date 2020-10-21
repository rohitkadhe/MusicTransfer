import React from "react";
import "./servicesPage.css";
import SpotifyLogo from "../../../icons/spotify.png";
export default function ServicesPage({ title, account_type }) {
  return (
    <div className="ui grid container center aligned">
      <div className="row">
        <div className="ui text">
          <h1 id="select-account-header">{title}</h1>
        </div>
      </div>
      <div className="row">
        <a href={`http://localhost:5433/spotify/authenticate/${account_type}`}>
          <div className="ui shadowed raised card ">
            <div className="content">
              <img className="ui image" src={SpotifyLogo} alt="Spotify Logo" />
            </div>
            <div className="extra content">
              <h2 className="header">Spotify</h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
