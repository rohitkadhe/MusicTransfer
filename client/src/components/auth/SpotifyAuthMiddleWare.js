import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import MusicTransferLoader from '../loader/MusicTransferLoader';
import { transferSongsRoute, sourceAccount, destinationAccount } from '../../constants/strings';

export default function SpotifyAuthMiddleWare({ match }) {
  const [userAccount, setUserAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { accType } = match.params;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const authenticateAccount = async (accType) => {
      let userAccount = await AuthService.authenticateAccount(accType);
      if (isMounted) {
        setUserAccount(userAccount);
        setIsLoading(false);
      }
    };
    authenticateAccount(accType);
    return () => {
      isMounted = false;
    };
  }, [accType]);

  if (isLoading) {
    return <MusicTransferLoader visible={isLoading} />;
  }
  if (userAccount === '') {
    window.opener.spotifyCallback('', accType, userAccount);
  }
  if (accType === sourceAccount && userAccount) {
    window.opener.spotifyCallback(
      `/${accType}/spotify/${userAccount.id}/playlists`,
      accType,
      userAccount,
    );
  } else if (
    accType === destinationAccount &&
    AuthService.isAuthenticated(sourceAccount) &&
    userAccount
  ) {
    window.opener.spotifyCallback(transferSongsRoute, accType, userAccount);
  } else {
    return <MusicTransferLoader visible={isLoading} />;
  }
}
