import React from 'react';
import Loader from 'react-loader-spinner';
import { Grid } from 'semantic-ui-react';

export default function MusicTransferLoader({ visible }) {
  return (
    <Grid container centered>
      <Loader
        type="Oval"
        color="#21ba45"
        style={{ marginTop: '20%' }}
        height={100}
        width={100}
        visible={visible}
      />
    </Grid>
  );
}
