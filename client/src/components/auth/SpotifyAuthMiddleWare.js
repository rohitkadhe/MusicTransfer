import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';

export default class SpotifyAuthMiddleWare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      srcAccount: undefined,
      destAccount: undefined,
    };
  }

  async componentDidMount() {
    let account = await AuthService.authenticateAccount(this.props.account_type);
    if (this.props.account_type === 'srcAcc') {
      this.setState({ srcAccount: account });
    }

    if (this.props.account_type === 'destAcc') {
      this.setState({
        destAccount: account,
        srcAccount: AuthService.getCurrentAccount('srcAcc'),
      });
    }
  }

  render() {
    const { srcAccount, destAccount } = this.state;
    const { account_type } = this.props;

    if (account_type === 'srcAcc' && srcAccount) {
      return (
        <Redirect
          to={{
            pathname: '/selectDestination',
            state: { from: this.props.location },
          }}
        />
      );
    }

    if (account_type === 'destAcc' && srcAccount && destAccount) {
      return (
        <Redirect
          to={{
            pathname: `/srcAcc/${srcAccount.id}/playlists`,
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      return <h1>Error Occured</h1>;
    }
  }
}
