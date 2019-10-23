/***
 *  Created by Nirav Bhimani
 ***/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography } from '@material-ui/core';
import { Lock, Info } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { Image } from 'components';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  moduleDescription: {
    display: '-webkit-box',               // CSS for truncationg text
    WebkitLineClamp: 2,                   // CSS for truncationg text
    WebkitBoxOrient: 'vertical',          // CSS for truncationg text
    overflow: 'hidden',                   // CSS for truncationg text
  },
  card: {
    width: '100%',
    maxWidth: '100%',
  },
  customMargin: {
    margin: '4px',
  },
  roundedBorderIcon: {
    borderRadius: '50%',
    border: '1px lightGrey solid'
  },
  pendingColorStyle: {
    color: '#E25E31',
  },
  completeColorStyle: {
    color: '#119A3A',
  },
  customIconPadding: {
    padding: '3px',
  },
  floatRight: {
    float: 'right',
  },
}));

export const GridModuleCard = props => {
  const minSize850 = useMediaQuery('(min-width:850px)');
  const classes = useStyles();
  const { moduleData } = props;

  return (
    <Grid item xs={6} container direction="column" alignItems="stretch">
      <Card onClick={props.onClick} className={classes.card}>

        <Grid item xs={12}>
          <Image src={moduleData.moduleImage.thumbnail} alt={`image${moduleData.id}`} />
        </Grid>

        <div className={classes.customMargin}>
          <Grid
            item
            xs={12}
            container
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={minSize850 ? 1 : 2}>
              <Lock className={clsx(classes.pendingColorStyle, classes.roundedBorderIcon, classes.customIconPadding)} />
            </Grid>

            <Grid item xs={minSize850 ? 10 : 8} container direction="column" alignItems="stretch">
              <Grid item xs>
                <Typography variant="subtitle1" className={classes.pendingColorStyle} noWrap>
                  {moduleData ? moduleData.title : ''}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="caption" component='p'>
                  Pending
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={minSize850 ? 1 : 2}>
              <Info className={clsx(classes.pendingColorStyle, classes.floatRight)} />
            </Grid>
          </Grid>
        </div>

      </Card>
    </Grid>
  );
};

GridModuleCard.propTypes = {
  moduleData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    moduleImage: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
      original: PropTypes.string.isRequired,
    }),
  }),
  onClick: PropTypes.func.isRequired,
};
