import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Grid,
  Avatar,
  useMediaQuery,
  Button,
  IconButton,
} from '@material-ui/core';
import { Settings, ArrowBack, ExitToApp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingScreen, HeaderElements } from 'components';
import { API } from 'helpers';
import { Link } from 'react-router-dom';
import { LayoutContext, LoginContext } from 'contexts';


const _ = require('underscore');
const useStyles = makeStyles({
  avatarStyle: {
    margin: 10,
    width: 130,
    height: 130,
  },
});

export const Profile = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:335px)');
  const { setHeaderElements } = useContext(LayoutContext);
  const { setLoginStatus, setAccessToken } = useContext(LoginContext);
  const [profileData, setProfileData] = useState({});
  const [APIErrorMessage, setAPIErrorMessage] = useState('');

  useEffect(() => {
    async function triggerAPI() {
      const response = await API.getUserProfileData();
      if (response.status) {
        setProfileData(response.data);
      } else {
        setAPIErrorMessage(response.message);
      }
    }

    triggerAPI();
  }, []);

  useEffect(() => {
    setHeaderElements(
      <HeaderElements>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton
              size={matches ? 'small' : 'medium'}
              style={{ padding: 0 }}
              component={Link}
              to='/home'
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="center">
              My Profile
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </HeaderElements>
    );
  }, [setHeaderElements, matches]);

  if (APIErrorMessage) {
    return (
      <Typography variant="body1" align="center">
        {APIErrorMessage}
      </Typography>
    );
  }

  let content = (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Avatar alt="user_profile_image" src={profileData.image} className={classes.avatarStyle} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">
          {`${profileData.firstName} ${profileData.lastName}`}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" gutterBottom>
          {profileData.emailId}
        </Typography>
      </Grid>

      <Grid item container direction="row" justify='center' alignItems="center" spacing={1}>
        <Grid item xs={5}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            size={matches ? 'small' : 'medium'}
            component={Link}
            to='/profile/edit'
          >
            Edit Profile
          </Button>
        </Grid>
        <Grid item>
          <IconButton size={matches ? 'small' : 'medium'} component={Link} to='profile/settings'>
            <Settings />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size={matches ? 'small' : 'medium'}
            onClick={() => {
              API.logout(localStorage.getItem('accessToken'));
              setAccessToken('');
              setLoginStatus(false);
            }}
          >
            <ExitToApp />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );

  return !_.isEmpty(profileData) ? content : <LoadingScreen />;
};
