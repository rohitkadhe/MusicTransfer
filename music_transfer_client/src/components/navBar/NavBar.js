import React, { Component } from "react";
import MusicLogo from "../../icons/music.png";
import "./navBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div class="ui secondary pointing menu">
        <a class="item" id="nav-text">
          <img src={MusicLogo} />
          Music Transfer
        </a>
      </div>
    );
  }
}
