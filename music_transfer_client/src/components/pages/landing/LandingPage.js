import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
export default function LandingPage({ location }) {
  return (
    <div className="ui container center aligned ">
      <div className="ui text">
        <h1 id="landing-header">Welcome to Music Transfer</h1>
        <h2 className="ui text landing-text">
          Easily Transfer Songs between Spotify Accounts
        </h2>
        <Link
          className="ui green huge button "
          to={{
            pathname: "/selectSource",
            state: { prevPath: location.pathname },
          }}
        >
          Get Started<i aria-hidden="true" className="right arrow icon"></i>
        </Link>
      </div>
    </div>
  );
}
