import React from "react";
import "./landing.css";
export default function landing(props) {
  return (
    <div className="ui container center aligned ">
      <div className="ui text">
        <h1 id="landing-header">Welcome to Music Transfer</h1>
        <h2 className="ui text landing-text">
          Easily Transfer Songs between Spotify Accounts
        </h2>
        <a
          className="ui green huge button "
          href="http://localhost:5433/spotify/authenticate"
        >
          Get Started<i aria-hidden="true" className="right arrow icon"></i>
        </a>
      </div>
    </div>
  );
}
