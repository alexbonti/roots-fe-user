import React, { useContext, useEffect, useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { TabularModuleCard, EnhancedModal, GridModuleCard , HeaderElements} from 'components';
import { ApplicationContext, LayoutContext } from 'contexts';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Avatar } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { API } from 'helpers';

const _ = require('underscore');

const SELECTION_TEXT = 'Select the module you want to start with';
const EMPTY_MODULES_ARRAY = 'No module currently in this program';

const useStyles = makeStyles(() => ({
  customMargin: {
    margin: '8px',
  },
  viewAllButton: {
    color: 'black',
    textDecoration: 'none',
  },
}));

// Enroll status in module
const IsEnrolled = false;

const Home = props => {
  const matches = useMediaQuery('(max-width:335px)');
  const { location: { state } } = props;
  const { programId, firstLoginStatus } = useContext(ApplicationContext);
  const [modulesArray, setModulesArray] = useState(null);
  const [redirectToIntro] = useState(state !== undefined && Object.prototype.hasOwnProperty.call(state, 'loginStatus') ? state.loginStatus : firstLoginStatus);
  const [isEnrolledStatus] = useState(IsEnrolled);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const [redirectToModuleDescrip, setRedirectToModuleDescrip] = useState(false);
  const { setHeaderElements } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderElements(
      <HeaderElements>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="body1">
              Home
            </Typography>
          </Grid>
          <Grid item>
            <Avatar alt="user_profile_image" src="" component={Link} to='/profile' />
          </Grid>
        </Grid>
      </HeaderElements>
    );
  }, [setHeaderElements]);

  useEffect(() => {
    if (redirectToIntro)
      API.getAllModules(programId, setModulesArray);
  }, [programId, redirectToIntro]);

  if (!redirectToIntro) {
    return <Redirect to={{ pathname: '/intro' }} />;
  }

  if (isEnrolledStatus) {
    return <Redirect to={{ pathname: `/module/:id` }} />;
  }

  if (redirectToModuleDescrip && !_.isNull(selectedModule)) {
    return <Redirect push to={{ pathname: `/module/${selectedModule}` }} />;
  }

  if (!_.isNull(modulesArray)) {
    return (
      <Grid container direction="column">

        <Grid item xs={12}>
          <Typography variant="body2" display="block" align="left" className={classes.customMargin}>
            {modulesArray.length < 1 ? EMPTY_MODULES_ARRAY : SELECTION_TEXT}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction={matches ? "column" : "row"}
          alignItems="stretch"
          spacing={2}
          style={{ margin: 0 }}
        >
          {
            modulesArray.map(obj => {
              return matches ? (
                <TabularModuleCard
                  moduleData={obj}
                  nextViewPathname={`/module/${obj.id}`}
                  key={obj.id}
                  onClick={() => {
                    setSelectedModule(obj.id);
                    setModalTitle(obj.title);
                    setModalContent(obj.description);
                    setIsOpen(true);
                  }}
                />
              ) : (
                <GridModuleCard
                  moduleData={obj}
                  nextViewPathname={`/module/${obj.id}`}
                  key={obj.id}
                  onClick={() => {
                    setSelectedModule(obj.id);
                    setModalTitle(obj.title);
                    setModalContent(obj.description);
                    setIsOpen(true);
                  }}
                />
              );
            })
          }
        </Grid>
        <EnhancedModal
          isOpen={isOpen}
          dialogContent={modalContent}
          dialogTitle={modalTitle}
          submitButtonName={"Enroll"}
          onClose={() => setIsOpen(false)}
          onSubmit={() => { setRedirectToModuleDescrip(true); }}
        />
      </Grid>
    );
  }

  // Return when null data in state i.e., Program doesn't exist
  return (
    <Typography variant="body1" align="center">
      Program doesn&rsquo;t esists
    </Typography>
  );
};

export default withRouter(Home);

Home.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      loginStatus: PropTypes.any,
    }),
  }),
};
