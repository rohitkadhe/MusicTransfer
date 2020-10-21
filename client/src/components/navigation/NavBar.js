import React, { Component } from "react";
import MusicLogo from "../../icons/musicTransferLogo.png";
import "./navBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div className="ui secondary menu">
        <a className="item" id="nav-text" href="http://localhost:3000">
          <img src={MusicLogo} alt="Logo" />
          Music Transfer
        </a>
      </div>
    );
  }
}
