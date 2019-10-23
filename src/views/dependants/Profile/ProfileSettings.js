import React, { useContext, useEffect } from 'react';
import { LayoutContext } from 'contexts';
import { withRouter, Link } from 'react-router-dom';
import { HeaderElements } from 'components';
import {
  Typography,
  Grid,
  useMediaQuery,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { ArrowBack, Build, HighlightOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const ProfileSettings = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:335px)');
  const { setHeaderElements } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderElements(
      <HeaderElements>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton
              size={matches ? 'small' : 'medium'}
              style={{ padding: 0 }}
              component={Link}
              to='/profile'
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="center">
              Profile Settings
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </HeaderElements>
    );
  }, [setHeaderElements, matches]);

  return (
    <div className={classes.root}>
      <List>
        <ListItem button component={Link} to='/profile/settings/change-password'>
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <HighlightOff style={{ color: red[500] }} />
          </ListItemIcon>
          <ListItemText primary="Deactivate" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default withRouter(ProfileSettings);
