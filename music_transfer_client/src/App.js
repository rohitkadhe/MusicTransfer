import React, { Component } from 'react';
import NavBar from './components/navigation/NavBar';
import ParticlesConfig from './particlesjsConfig.json';
import Particles from 'react-particles-js';
import AuthService from './services/AuthService';
import CreateRoutes from './routes/routes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedPlaylists: [],
      fetchedSongs: [],
      srcAccount: undefined,
      destAccount: undefined,
    };
  }

  componentDidMount() {
    let srcAccount = AuthService.getCurrentAccount('srcAcc');
    let destAccount = AuthService.getCurrentAccount('destAcc');
    if (srcAccount) {
      this.setState({ srcAccount });
    }
    if (destAccount) {
      this.setState({ destAccount });
    }
  }

  render() {
    return (
      <div id="App">
        <Particles params={ParticlesConfig} id="particles" />
        <NavBar />
        <div className="content">{CreateRoutes()}</div>
      </div>
    );
  }
}

export default App;
