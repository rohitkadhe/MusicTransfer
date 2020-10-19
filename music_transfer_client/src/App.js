import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import ParticlesConfig from "./particlesjsConfig.json";
import Particles from "react-particles-js";
import LandingPage from "./components/pages/landing/LandingPage";
import ServicesPage from "./components/pages/services/ServicesPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SpotifyAuthMiddleWare from "./components/auth/SpotifyAuthMiddleWare";
import AuthService from "./services/AuthService";
import "./App.css";

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
    let srcAccount = AuthService.getCurrentAccount("srcAcc");
    let destAccount = AuthService.getCurrentAccount("destAcc");
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
        <div className="content">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              path="/selectSource"
              render={(props) => (
                <ServicesPage
                  {...props}
                  account_type={"srcAcc"}
                  title={`Select the Source Account`}
                />
              )}
            />
            <Route
              path="/spotify/srcAcc/:access_token"
              render={(props) => (
                <SpotifyAuthMiddleWare {...props} account_type="srcAcc" />
              )}
            />
            <ProtectedRoute
              path="/selectDestination"
              component={(props) => (
                <ServicesPage
                  {...props}
                  account_type={"destAcc"}
                  title={`Select the Destination Account`}
                />
              )}
            />
            <Route
              path="/spotify/destAcc/:access_token"
              render={(props) => (
                <SpotifyAuthMiddleWare {...props} account_type="destAcc" />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
