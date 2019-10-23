/***
 *  Created by Sanchit Dang
 ***/
import React, { useState, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { LoginContext } from 'contexts';
import { TextField, Paper, makeStyles, Typography, Button, Box, Grid } from '@material-ui/core';
import { notify } from 'components';
import { API } from 'helpers';

const _ = require('underscore');

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginBox: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    marginTop: theme.spacing(1)
  },
  developMessage: {
    position: "absolute",
    bottom: "2vh"
  }
}));

const ChangePassword = props => {
  const classes = useStyles();
  const { setAccessToken } = useContext(LoginContext);
  const [pageHeading] = useState('Change Password');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirectionStatus, setRedirectionStatus] = useState('');

  function submitChangePasswordRequest() {
    if (_.isEmpty(oldPassword)) {
      notify('Please enter you current password');
    }
    else if (_.isEmpty(newPassword)) {
      notify('Please enter you new password');
    }
    else if (_.isEmpty(confirmPassword)) {
      notify('Please re-enter new password');
    }
    else if (_.isEqual(newPassword, confirmPassword)) {
      API.changePassword({
        skip: false,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, props.location.state.accessToken, setRedirectionStatus);
    } else {
      notify('Password doesn\'t match');
    }
  }

  function skipPasswordChange() {
    API.changePassword({
      skip: true,
      oldPassword: '',
      newPassword: ''
    }, props.location.state.accessToken, setRedirectionStatus);
  }

  let content = (
    <div>
      <Grid container spacing={0} justify="center">
        <Grid className={classes.loginBox} item xs={10} lg={2}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              {pageHeading}
            </Typography>
            <form noValidate>
              <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Current Password" type="password" name="current-password" autoComplete="current-password" onChange={e => setOldPassword(e.target.value)} autoFocus />
              <TextField variant="outlined" margin="normal" required fullWidth name="new-password" label="New Password" type="password" id="new-password" onChange={e => setNewPassword(e.target.value)} autoComplete="new-password" />
              <TextField variant="outlined" margin="normal" required fullWidth name="confirm-new-password" label="Confirm New Password" type="password" id="confirm-new-password" onChange={e => setConfirmPassword(e.target.value)} autoComplete="confirm-new-password" />
              <Button fullWidth variant="contained" color="primary" className={classes.buttons} onClick={submitChangePasswordRequest}>Submit</Button>
              <Button fullWidth variant="contained" color="secondary" className={classes.buttons} onClick={skipPasswordChange}>Skip</Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.developMessage}>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              Developed by Deakin Launchpad
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );

  if (_.isEmpty(window.localStorage.getItem('accessToken')) && props.location.state === undefined)
    return <Redirect to={{ pathname: '/login' }} />;

  if (redirectionStatus) {
    setAccessToken(props.location.state.accessToken);
    return <Redirect to={{ pathname: '/home' }} />;
  }

  return content;
};

export default withRouter(ChangePassword);
