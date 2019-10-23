import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { LayoutContext } from 'contexts';
import { HeaderElements } from 'components';

const ModulesView = () => {
  const { setHeaderElements } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderElements(
      <HeaderElements>
        <Typography variant="body1">
          Modules
        </Typography>
      </HeaderElements >
    );
  }, [setHeaderElements]);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={10}>
        <Typography variant="subtitle1" align="center">
          You are not currently enrolled in any module.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withRouter(ModulesView);
