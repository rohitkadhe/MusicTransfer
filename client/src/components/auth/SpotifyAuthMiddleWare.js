import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import MusicTransferLoader from '../loader/MusicTransferLoader';

export default function SpotifyAuthMiddleWare({ accType }) {
  const [userAccount, setUserAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authenticateAccount = async (accType) => {
      setIsLoading(true);
      let userAccount = await AuthService.authenticateAccount(accType);
      setUserAccount(userAccount);
      setIsLoading(false);
    };
    authenticateAccount(accType);
  }, [accType]);

  if (isLoading) {
    return <MusicTransferLoader visible={isLoading} />;
  } else if (accType === 'srcAcc' && userAccount) {
    window.opener.spotifyCallback(
      `/${accType}/spotify/${userAccount.id}/playlists`,
      accType,
      userAccount,
    );
    return <MusicTransferLoader visible={isLoading} />;
  } else if (accType === 'destAcc' && userAccount) {
    window.opener.spotifyCallback(`/${accType}/spotify/transfer`, accType, userAccount);
    return <MusicTransferLoader visible={isLoading} />;
  } else {
    return <MusicTransferLoader visible={isLoading} />;
  }
}
