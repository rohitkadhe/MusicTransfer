import React, { Component } from 'react';
import MusicLogo from '../../icons/musicTransferLogo.png';
import { Menu } from 'semantic-ui-react';
import './navBar.css';

export default class NavBar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item id="nav-text" name="Music Transfer">
          <img src={MusicLogo} alt="Logo" />
          Music Transfer
        </Menu.Item>
      </Menu>
    );
  }
}
