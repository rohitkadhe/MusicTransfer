import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import MusicTransferLoader from '../loader/MusicTransferLoader';

export default function SpotifyAuthMiddleWare({ account_type, location }) {
  const [srcAcc, setSrcAcc] = useState(null);
  const [destAcc, setDestAcc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticateAccount = async (account_type) => {
      let userAccount = await AuthService.authenticateAccount(account_type);
      if (account_type === 'srcAcc' && userAccount) {
        setSrcAcc(userAccount);
      }
      if (account_type === 'destAcc' && userAccount) {
        setDestAcc(userAccount);
        setSrcAcc(AuthService.getAccFromLocalStorage('srcAcc'));
      }
      setIsLoading(false);
    };
    authenticateAccount(account_type);
  }, [account_type]);

  const renderRedirectComponent = () => {
    if (isLoading) {
      return <MusicTransferLoader visible={isLoading} />;
    } else if (srcAcc && !destAcc) {
      return <Redirect to={{ pathname: `/srcAcc/${srcAcc.id}/playlists`, state: { from: location } }} />;
    } else if (srcAcc && destAcc) {
      return <Redirect to={{ pathname: `/destAcc/confirmTransfer`, state: { from: location } }} />;
    }
  };

  return <div>{renderRedirectComponent()}</div>;
}
