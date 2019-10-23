import React, { useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { LayoutContext } from 'contexts';

const Notification = () => {
  const { setHeaderElements } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderElements(
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item xs>
          <Typography variant="body1">
            Notifications
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            component={Link}
            to='/notifications/settings'
            style={{ paddingRight: 0 }}
          >
            <Settings />
          </IconButton>
        </Grid>
      </Grid>
    );
  }, [setHeaderElements]);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={11}>
        <Typography variant="body1" align="left">
          New
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <List aria-label="new-notifications">
          {
            [1, 2, 3].map((item, key) => {
              return (
                <ListItem button key={`old_${key}`} divider>
                  <ListItemText primary={`New Notification ${item}`} />
                </ListItem>
              );
            })
          }
        </List>
      </Grid>

      <Grid item xs={11}>
        <Typography variant="body1" align="left">
          Earlier
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <List aria-label="old-notifications">
          {
            [1, 2, 3].map((item, key) => {
              return (
                <ListItem button key={`old_${key}`} divider>
                  <ListItemText primary={`Notification ${item}`} />
                </ListItem>
              );
            })
          }
        </List>
      </Grid>
    </Grid>
  );
};

export default withRouter(Notification);
