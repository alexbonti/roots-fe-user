import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ModuleCard } from 'components';
import { ApplicationContext } from 'contexts';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { API } from 'helpers/index';

const _ = require('underscore');
const MODULES_ARRAY_EMPTY = 'No modules currently available';

const useStyles = makeStyles(() => ({
  gridMargin: {
    margin: '10px',
  },
  customCardMargin: {
    marginBottom: '10px',
  },
}));

const ModulesList = props => {
  const { location: { pathname } } = props;
  const { programId } = useContext(ApplicationContext);
  const [dataArray, setDataArray] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    // pathname === '/modules/upcoming' ? API.getAllModules(programId, setDataArray) : setDataArray([]);
    switch (pathname) {
      case '/modules/upcoming':
        return API.getAllModules(programId, setDataArray);
      case '/modules/completed':
        return setDataArray([]);             // Update when completed data is recieved from the API
      case '/favourites/modules':
      default:
        return;
    }
  }, [programId, pathname]);

  const renderTitle = () => {
    switch (pathname) {
      case '/modules/upcoming':
        return 'Below are the upcoming modules for your enrolled program.';
      case '/modules/completed':
        return 'Below are the completed modules for your enrolled program.';             // Update when completed data is recieved from the API
      case '/favourites/modules':
        return 'nOne';             // Update when completed data is recieved from the API
      default:
        return;
    }
  };

  if (!_.isNull(dataArray)) {
    return (
      <div className={classes.gridMargin}>
        <Grid container direction="column">

          <Grid item xs={12}>
            <Typography variant="body2" display="block" align="justify">
              {renderTitle()}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {
              dataArray.length < 1 ? (
                <Typography variant="body2" display="block" align="center">
                  {MODULES_ARRAY_EMPTY}
                </Typography>
              ) : (
                dataArray.map((obj, key) => {
                  return <ModuleCard
                    style={classes.customCardMargin}
                    moduleData={obj}
                    programId={programId}
                    nextViewPathname={`/module/${obj.id}`}
                    key={key}
                  />;
                })
              )
            }
          </Grid>

        </Grid>
      </div>
    );
  }

  return 'No Data';    // Return when null data in state
};

export default withRouter(ModulesList);

ModulesList.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};
