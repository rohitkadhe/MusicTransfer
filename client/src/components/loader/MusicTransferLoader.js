import React from 'react';
import Loader from 'react-loader-spinner';

export default function MusicTransferLoader({ visible }) {
  return (
    <div className="ui container center aligned ">
      <Loader type="Oval" color="#21ba45" style={{ marginTop: '20%' }} height={100} width={100} visible={visible} />;
    </div>
  );
}
