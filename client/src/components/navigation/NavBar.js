import React from 'react';
import MusicLogo from '../../icons/musicTransferLogo.png';
import { Menu, Image, Header } from 'semantic-ui-react';
import './navBar.css';

export default function NavBar({ history }) {
  return (
    <Menu secondary>
      <Menu.Item
        id="nav-text"
        onClick={() => {
          return history.push('/');
        }}
      >
        <Image src={MusicLogo} />
        <Header.Subheader>Music Transfer</Header.Subheader>
      </Menu.Item>
    </Menu>
  );
}
