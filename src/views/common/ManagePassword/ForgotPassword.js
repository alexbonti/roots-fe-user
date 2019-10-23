/***
 *  Created by Sanchit Dang
 ***/
import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { TextField, Paper, makeStyles, Typography, Button, Box, Grid } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { notify } from 'components';
// import { API } from 'helpers';


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
  },
  successIcon: {
    color: "green"
  },
  customMessagePadding: {
    paddingBottom: theme.spacing(3)
  },
}));

export const ForgotPassword = () => {
  const classes = useStyles();
  const [pageHeading, setPageHeading] = useState('Find your account');
  const [emailId, setEmailId] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(false);

  function submitForgotPasswordForm() {

    // Check whether entered password is valid or not
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPatternTest = emailPattern.test(emailId);

    if(emailPatternTest) {
      // API here
      setSubmissionStatus(true);
      setPageHeading('Forgot Password');
    } else {
      notify('Invalid email');
    }
  }

  let content = (
    <div>
      <Grid container spacing={0} justify="center">
        <Grid className={classes.loginBox} item xs={10} lg={2}>
          {
            submissionStatus ? (
              <Paper className={classes.paper}>
                <Typography variant="h5">
                  <CheckCircle className={classes.successIcon} />
                  {pageHeading}
                </Typography>
                <Typography variant="body2" className={classes.customMessagePadding}>
                  You should soon receive an email allowing you to reset your password.
                </Typography>
                <Button fullWidth variant="contained" color="primary" className={classes.buttons} component={Link} to={'/login'}>
                  BACK TO LOGIN
                </Button>
              </Paper>
            ) : (
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                  {pageHeading}
                </Typography>
                <form noValidate>
                  <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={e => setEmailId(e.target.value)} autoFocus />
                  <Button fullWidth variant="contained" color="primary" className={classes.buttons} onClick={submitForgotPasswordForm}>Submit</Button>
                  <Button fullWidth variant="contained" color="secondary" className={classes.buttons} component={Link} to={'/login'}>
                    LOGIN
                  </Button>
                </form>
              </Paper>
            )
          }
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

  return content;
};
