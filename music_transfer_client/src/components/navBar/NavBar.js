import React, { Component } from "react";
import MusicLogo from "../../icons/music.png";
import "./navBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div class="ui secondary menu">
        <a class="item" id="nav-text" href="http://localhost:3000">
          <img src={MusicLogo} alt="Logo" />
          Music Transfer
        </a>
      </div>
    );
  }
}
