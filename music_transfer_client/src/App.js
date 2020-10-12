import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
import Landing from "./components/pages/landing/Landing";

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
        <NavBar />
        <Landing />
      </div>
    );
  }
}

export default App;
