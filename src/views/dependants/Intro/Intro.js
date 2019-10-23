/***
 *  Created by Nirav Bhimani
 ***/
import React, { useContext } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ApplicationContext } from 'contexts';

const WELCOME_TEXT = "Please go through the video below to learn more about the program";

const useStyles = makeStyles(() => ({
  topMargin: {
    marginTop: '70px',
    marginBottom: '30px',
  },
  button: {
    width: '80%',
    alignItems: 'center'
  },
  buttonPosition: {
    textAlign: 'center',
  },
}));

export const Intro = () => {
  const classes = useStyles();
  const { setFirstLoginStatus } = useContext(ApplicationContext);

  return (
    <Grid container direction="column" alignItems="stretch" justify="center">

      <Grid item xs={12}>
        <Typography variant="h4" align="center" className={classes.topMargin}>
          {`Welcome to ${process.env.REACT_APP_NAME}`}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom align="center">
          {WELCOME_TEXT}
        </Typography>
      </Grid>

      <Grid item xs={12} className={classes.buttonPosition}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to={{ pathname: '/home', state: { loginStatus: true} }}
          onClick={() => setFirstLoginStatus(true)}
        >
          Continue
        </Button>
      </Grid>

    </Grid>
  );
};
