import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const ErrorPage = () => {
  const classes = useStyles();

  return (
    <center>
      Page Not Found
      <br />
      <Button variant="contained" className={classes.button} component={Link} to={'login'}>
        Login
      </Button>
    </center>
  );
};
