/***
 *  Created by Nirav Bhimani
 ***/
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Image } from 'components';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxHeight: '100px'
  },
  moduleDescription: {
    display: '-webkit-box',               // CSS for truncationg text
    WebkitLineClamp: 2,                   // CSS for truncationg text
    WebkitBoxOrient: 'vertical',          // CSS for truncationg text
    overflow: 'hidden',                   // CSS for truncationg text
  },
  removeTextDecoration: {
    textDecoration: 'none',
    color: 'inherit',
  },
  fullWidth: {
    width: '100%',
  },
}));

export const ModuleCard = props => {
  const classes = useStyles();
  const { moduleData, nextViewPathname, style } = props;

  return (
    <div className={clsx(classes.root, style)}>
      <Grid item container xs={12} lg={4} md={4} sm={8} xl={6}>
        <Paper className={clsx(classes.paper, classes.fullWidth)}>
          <Link to={{ pathname: nextViewPathname }} className={classes.removeTextDecoration}>
            <Grid item container spacing={2} direction="row" alignItems="stretch">

              <Grid item xs={4} lg={4} md={4} sm={4} xl={4}>
                <Image src={moduleData.moduleImage} alt={`image${moduleData.id}`} />
              </Grid>

              <Grid item xs={8} lg={8} md={8} sm={8} xl={8} container direction="column" justify="flex-start" alignItems="stretch">
                <Grid item>
                  <Typography variant="h6" display="block" gutterBottom noWrap>
                    {moduleData.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" className={classes.moduleDescription} gutterBottom>
                    {moduleData.description}
                  </Typography>
                </Grid>
              </Grid>

            </Grid>
          </Link>
        </Paper>
      </Grid>
    </div>
  );
};

ModuleCard.propTypes = {
  moduleData: PropTypes.object,
  nextViewPathname: PropTypes.string.isRequired,
  style: PropTypes.string,
};
