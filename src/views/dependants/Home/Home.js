import React, { useEffect, useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box, Grid } from "@material-ui/core/";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {FullListJobs} from "components";
import {LoginContext} from "contexts"

import API from "../../../helpers/api";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    // padding: "3vh 0 0 0",
  },
  tabs: {
    height: "100%", 
    boxShadow: "none"
    
  },

  tab: {
    height: "85%",
    alignSelf: "flex-end",
    border: "1px solid #f0f0f0"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    // accent: { main: "#FFD922" },
    // error: { main: "#D0011B" },
    // contrastThreshold: 3,
    // tonalOffset: 0.2,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}




export const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {loginStatus} = useContext(LoginContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };


  useEffect(() => {

    const triggerAPI = async () => {
      const oppResponse = await API.getOpportunity();
      console.log(oppResponse);
      // const oppDraftResponse = await API.getOpportunityDraft();
      // if (oppResponse.status && oppDraftResponse.status) {
      //   setDataJobs(oppResponse.response);
      //   setDataJobsDraft(oppDraftResponse.response);
      // }
    };
    if (loginStatus) {
      triggerAPI();
    }
  }, [loginStatus]);



  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="default" style={{height: "13vh", }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.tabs}
            aria-label="full width tabs example"
          >
            <Tab label="Search" {...a11yProps(0)} className={classes.tab} />
            <Tab label="News" {...a11yProps(1)} className={classes.tab}/>
            <Tab label="Resources" {...a11yProps(2)} className={classes.tab}/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <FullListJobs />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </div>
    </ThemeProvider>
  );
};
