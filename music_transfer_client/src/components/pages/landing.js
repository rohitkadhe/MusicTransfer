import React from "react";
import "./landing.css";
export default function landing() {
  return (
    <div class="ui vertical center aligned segment">
      <div class="ui text">
        <h1 class="ui header" id="landing-header">
          Welcome to Music Transfer
        </h1>
        <h2 class="ui text landing-text">
          Easily Transfer Songs between Spotify Accounts
        </h2>
        <button class="ui green huge button ">
          Get Started<i aria-hidden="true" class="right arrow icon"></i>
        </button>
      </div>
    </div>
  );
}
