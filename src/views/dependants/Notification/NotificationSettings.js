import React, { useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  useMediaQuery,
  Switch,
  makeStyles,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { LayoutContext } from 'contexts';

const useStyles = makeStyles(() => ({
  listRoot: {
    width: '100%',
  },
}));

const Notification = () => {
  const classes = useStyles();
  const { setHeaderElements } = useContext(LayoutContext);
  const matches = useMediaQuery('(max-width:335px)');

  useEffect(() => {
    setHeaderElements(
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton
              size={matches ? 'small' : 'medium'}
              style={{ paddingLeft: 0 }}
              component={Link}
              to={`/notifications`}
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="center">
              Notification Management
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    );
  }, [matches, setHeaderElements]);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12}>
        <List component="nav" aria-label="notification-settings-list" className={classes.listRoot}>
          <ListItem button>
            <ListItemText primary="Notification" />
            <ListItemIcon>
              <Switch id="switch" />
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default withRouter(Notification);
