import React from 'react';
import NavBar from './components/navigation/NavBar';
import ParticlesConfig from './particlesjsConfig.json';
import Particles from 'react-particles-js';
import Routes from './routes/routes';

import './App.css';

function App() {
  return (
    <div id="App">
      <Particles params={ParticlesConfig} id="particles" />
      <NavBar />
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
