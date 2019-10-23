import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from 'contexts';
import { withRouter, Link } from 'react-router-dom';
import { HeaderElements } from 'components';
import {
  Button,
  Typography,
  Grid,
  useMediaQuery,
  IconButton,
  TextField,
  Avatar,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { API } from 'helpers';
import { LoadingScreen } from 'components';

const _ = require('underscore');
const useStyles = makeStyles({
  avatarSmallDeviceStyle: {
    margin: 10,
    width: 80,
    height: 80,
  },
  avatarStyle: {
    margin: 10,
    width: 130,
    height: 130,
  },
});

const EditProfile = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:335px)');
  const { setHeaderElements } = useContext(LayoutContext);
  // const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [APIErrorMessage, setAPIErrorMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobileNumber, setUserMobileNumber] = useState('');

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
              Edit profile
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" align="left" onClick={() => {
              setUserEmail(profileData.emailId);
              setUserName(`${profileData.firstName} ${profileData.lastName}`);
              setUserMobileNumber(profileData.phoneNumber);
            }}
            >
              Cancel
            </Typography>
          </Grid>
        </Grid>
      </HeaderElements >
    );
  }, [setHeaderElements, matches, profileData]);

  useEffect(() => {
    async function triggerAPI() {
      const response = await API.getUserProfileData();
      if (response.status) {
        setProfileData(response.data);
        setUserEmail(response.data.emailId);
        setUserName(`${response.data.firstName} ${response.data.lastName}`);
        setUserMobileNumber(response.data.phoneNumber);
      } else {
        setAPIErrorMessage(response.message);
      }
    }

    triggerAPI();
  }, []);

  const saveChanges = () => {
    // TODO: Add API here
  };

  if (APIErrorMessage) {
    return (
      <Typography variant="body1" align="center">
        {APIErrorMessage}
      </Typography>
    );
  }

  let content = (
    <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
      <Grid item container xs={11} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Avatar
            alt="user_profile_image"
            src=""
            className={matches ? classes.avatarSmallDeviceStyle : classes.avatarStyle}
          />
        </Grid>
      </Grid>

      <Grid item xs={11}>
        <TextField
          fullWidth
          autoFocus
          type="text"
          id="user-name"
          label="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          margin="normal"
          style={{ margin: 0 }}
        />
      </Grid>

      <Grid item xs={11}>
        <TextField
          fullWidth
          type="email"
          id="user-email"
          label="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          margin="normal"
          style={{ margin: 0 }}
        />
      </Grid>

      <Grid item xs={11}>
        <TextField
          fullWidth
          type="number"
          id="user-phone-number"
          label="Phone Number"
          value={userMobileNumber}
          onChange={(e) => setUserMobileNumber(e.target.value)}
          margin="normal"
          style={{ margin: 0 }}
        />
      </Grid>

      <Grid item xs={11}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size={matches ? 'medium' : 'small'}
          id="update-button"
          // disabled={loading ? true : false}
          onClick={() => {
            // setLoading(true);        // TODO: Enable this when saveChanges logic is written
            saveChanges();
          }}
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );

  return !_.isEmpty(profileData) ? content : <LoadingScreen />;
};

export default withRouter(EditProfile);
