import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import MusicTransferLoader from '../loader/MusicTransferLoader';

export default function SpotifyAuthMiddleWare({ account_type, location }) {
  const [srcAcc, setSrcAcc] = useState(null);
  const [destAcc, setDestAcc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authenticateAccount = async (account_type) => {
      setIsLoading(true);
      let userAccount = await AuthService.authenticateAccount(account_type);
      if (account_type === 'srcAcc' && userAccount) {
        setSrcAcc(userAccount);
      }
      if (account_type === 'destAcc' && userAccount) {
        setDestAcc(userAccount);
        setSrcAcc(AuthService.getAccFromsessionStorage('srcAcc'));
      }
      setIsLoading(false);
    };
    authenticateAccount(account_type);
  }, [account_type]);

  const renderRedirectComponent = () => {
    if (isLoading) {
      return <MusicTransferLoader visible={isLoading} />;
    } else if (srcAcc && !destAcc) {
      return (
        <Redirect
          to={{
            pathname: `/${account_type}/spotify/${srcAcc.id}/playlists`,
            state: { from: location },
          }}
        />
      );
    } else if (srcAcc && destAcc) {
      return (
        <Redirect
          to={{ pathname: `/${account_type}/spotify/transfer`, state: { from: location } }}
        />
      );
    }
  };

  return <div>{renderRedirectComponent()}</div>;
}
