import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
import Landing from "./components/pages/landing/Landing";
import Particles from "react-particles-js";
import ParticlesConfig from "./particlesjsConfig.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      fetchedPlaylists: [],
      fetchedSongs: [],
      token: "",
    };
    const params = this.getHashParams();
    console.log(params);
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    console.log(this.state);
    return (
      <div id="App">
        <Particles params={ParticlesConfig} id="particles" />
        <div className="content">
          <NavBar />
          <Landing />
        </div>
      </div>
    );
  }
}

export default App;
