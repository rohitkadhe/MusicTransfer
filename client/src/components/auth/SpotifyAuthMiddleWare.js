import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Loader from 'react-loader-spinner';

export default function SpotifyAuthMiddleWare({ account_type, location }) {
  const [srcAcc, setSrcAcc] = useState(null);
  const [destAcc, setDestAcc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const authenticateAccount = async (account_type) => {
      let userAccount = await AuthService.authenticateAccount(account_type);
      if (account_type === 'srcAcc' && userAccount) {
        setSrcAcc(userAccount);
      } else if (account_type === 'destAcc' && userAccount) {
        setDestAcc(userAccount);
        setSrcAcc(AuthService.getAccFromLocalStorage('srcAcc'));
      }
      setLoading(false);
    };
    authenticateAccount(account_type);
  }, [account_type]);

  const renderRedirectComponent = () => {
    if (loading) {
      return (
        <div className="ui container center aligned ">
          <Loader type="Oval" color="#21ba45" style={{ marginTop: '20%' }} height={100} width={100} visible={loading} />;
        </div>
      );
    }
    if (srcAcc && !destAcc) {
      return <Redirect to={{ pathname: '/selectDestination', state: { from: location } }} />;
    }
    if (srcAcc && destAcc) {
      return <Redirect to={{ pathname: `/srcAcc/${srcAcc.id}/playlists`, state: { from: location } }} />;
    }
  };

  return <div>{renderRedirectComponent()}</div>;
}
