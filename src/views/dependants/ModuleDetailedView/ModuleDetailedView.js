import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { ApplicationContext, LayoutContext } from 'contexts';
import { API } from 'helpers';
import { Grid, Chip, Button, useMediaQuery, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { DrawerView, LoadingScreen, HeaderElements, EnhancedDrawer } from 'components';

const useStyles = makeStyles(theme => ({
  customMargin: {
    margin: '10px',
  },
  chip: {
    margin: theme.spacing(1),
    marginLeft: 0,
    color: 'white',
  },
  button: {
    marginBottom: '8px',
  },
}));

const ModuleDetailedView = props => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:335px)');
  const { match: { params: { m_id } } } = props;
  const [moduleData, setModuleData] = useState('');
  const [APIErrorMessage, setAPIErrorMessage] = useState('');
  const {
    programId,
    isDrawerOpen,
    setIsDrawerOpen,
    targetView,
    setTargetView,
    drawerTitle,
  } = useContext(ApplicationContext);
  const { setHeaderElements } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderElements(
      <HeaderElements>
        <Typography variant="body1">
          {moduleData.title}
        </Typography>
      </HeaderElements>
    );
  }, [setHeaderElements, moduleData]);

  const handleDrawerClick = (view_name) => {
    setTargetView(view_name);
    setIsDrawerOpen(true);
  };
  const moduleActionItems = [
    {
      label: "Goals",
      keyName: "goals",
      style: {
        backgroundColor: "#309DBF",
      },
      defaultSize: "medium",
      action: {
        type: "BOTTOM_DRAWER",
        clickHandler: () => handleDrawerClick('GOAL_VIEW')
      },
      button: {
        fullWidth: true,
        variant: "contained",
        color: "primary",
      }
    },
    {
      label: "Quizes",
      keyName: "quizes",
      style: {
        backgroundColor: "#F71F75",
      },
      defaultSize: "medium",
      action: {
        type: "BOTTOM_DRAWER",
        clickHandler: () => handleDrawerClick('QUIZ_VIEW')
      },
      button: {
        fullWidth: true,
        variant: "contained",
        color: "primary",
      }
    },
    {
      label: "Timetable",
      keyName: "timetable",
      style: {
        backgroundColor: "#E25E31",
      },
      defaultSize: "medium",
      action: {
        type: "LINK",
        pathname: `/module/${m_id}/timetable`,
        clickHandler: () => handleDrawerClick('TIMETABLE_VIEW')
      },
      button: {
        fullWidth: true,
        variant: "contained",
        color: "primary",
      }
    },
    {
      label: "Activities",
      keyName: "activities",
      style: {
        backgroundColor: "#F75356",
      },
      defaultSize: "medium",
      action: {
        type: "BOTTOM_DRAWER",
        clickHandler: () => handleDrawerClick('ACTIVITY_LIST_VIEW')
      },
      button: {
        fullWidth: true,
        variant: "contained",
        color: "primary",
      }
    }
  ];

  useEffect(() => {
    async function triggerAPI() {
      const response = await API.getSpecificModule(programId, m_id);
      if (response.status) {
        setModuleData(response.data);
      } else {
        setAPIErrorMessage(response.message);
      }
    }
    triggerAPI();
  }, [programId, m_id]);

  const renderModuleContent = (data) => {
    switch (data.type) {
      case 'HTML':
        return ReactHtmlParser(data.content);
      default:
        return;
    }
  };

  const renderChip = (item, key) => {
    return moduleData[item.keyName] && moduleData[item.keyName].length > 0 ? (
      <Chip
        key={key}
        label={item.label ? item.label : 'Default label Name'}
        className={classes.chip}
        style={item.style}
        size={matches ? 'small' : item.defaultSize}
        onClick={() => item.action.clickHandler && item.action.type === 'BOTTOM_DRAWER' ? item.action.clickHandler() : ''}     // check whether clickHandler is not undefiend
        component={item.action.type === 'BOTTOM_DRAWER' ? 'button' : Link}
        to={item.action.type === 'LINK' ? { pathname: item.action.pathname } : ''}
      />
    ) : '';
  };

  const renderButton = (item, key) => {
    return moduleData[item.keyName] && moduleData[item.keyName].length > 0 ? (
      <Button
        size={matches ? 'small' : item.defaultSize}
        variant={item.button.variant ? item.button.variant : "contained"}
        color={item.button.color ? item.button.color : "primary"}
        style={item.style}
        key={key}
        className={classes.button}
        fullWidth={item.button.fullWidth ? item.button.fullWidth : false}
        onClick={() => item.action.clickHandler && item.action.type === 'BOTTOM_DRAWER' ? item.action.clickHandler() : ''}     // check whether clickHandler is not undefiend
        component={item.action.type === 'BOTTOM_DRAWER' ? 'button' : Link}
        to={item.action.type === 'LINK' ? { pathname: item.action.pathname } : ''}
      >
        {item.label ? item.label : 'Default Button name'}
      </Button>
    ) : '';
  };

  if (APIErrorMessage) {
    return (
      <Typography variant="body1" align="center">
        {APIErrorMessage}
      </Typography>
    );
  }

  return moduleData ? (
    <div className={classes.customMargin}>
      <Grid container direction="column" justify="center" alignItems="stretch">

        <Grid item xs={12}>
          {
            moduleActionItems.map((item, key) => {
              return renderChip(item, key);
            })
          }
        </Grid>

        {
          targetView ? (
            <EnhancedDrawer
              anchor={'bottom'}
              title={drawerTitle}
              content={<DrawerView m_id={m_id} />}
              isOpen={isDrawerOpen}
              onClose={() => { setIsDrawerOpen(false); }}
              options={{ height: '80vh', width: 'auto' }}
            />
          ) : ''
        }

        {
          Object.prototype.hasOwnProperty.call(moduleData, 'content') ? (
            <Grid item xs={12}>
              {
                moduleData.content.map(obj => {
                  return renderModuleContent(obj);
                })
              }
            </Grid>
          ) : ''
        }

        <Grid item xs={12}>
          {
            moduleActionItems.map((item, key) => {
              return renderButton(item, key);
            })
          }
        </Grid>

      </Grid>
    </div>
  ) : <LoadingScreen />;
};

export default withRouter(ModuleDetailedView);

ModuleDetailedView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      m_id: PropTypes.string.isRequired,
    })
  })
};
