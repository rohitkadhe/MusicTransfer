import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import MusicTransferLoader from '../loader/MusicTransferLoader';

export default function SpotifyAuthMiddleWare({ account_type }) {
  const [userAccount, setUserAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authenticateAccount = async (account_type) => {
      setIsLoading(true);
      let userAccount = await AuthService.authenticateAccount(account_type);
      setUserAccount(userAccount);
      setIsLoading(false);
    };
    authenticateAccount(account_type);
  }, [account_type]);

  if (isLoading) {
    return <MusicTransferLoader visible={isLoading} />;
  } else if (account_type === 'srcAcc' && userAccount) {
    window.opener.spotifyCallback(
      `/${account_type}/spotify/${userAccount.id}/playlists`,
      account_type,
      userAccount,
    );
    return <MusicTransferLoader visible={isLoading} />;
  } else if (account_type === 'destAcc' && userAccount) {
    window.opener.spotifyCallback(`/${account_type}/spotify/transfer`, account_type, userAccount);
    return <MusicTransferLoader visible={isLoading} />;
  } else {
    return <MusicTransferLoader visible={isLoading} />;
  }
}
