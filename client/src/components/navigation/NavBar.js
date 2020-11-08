import React from 'react';
import MusicLogo from '../../icons/musicTransferLogo.png';
import { Menu, Image, Header } from 'semantic-ui-react';
import './navBar.css';
import { homeRoute } from '../../constants/strings';
export default function NavBar({ history }) {
  return (
    <Menu secondary>
      <Menu.Item
        id="nav-text"
        onClick={() => {
          return history.push(homeRoute);
        }}
      >
        <Image src={MusicLogo} />
        <Header.Subheader>Music Transfer</Header.Subheader>
      </Menu.Item>
    </Menu>
  );
}
