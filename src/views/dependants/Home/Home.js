import React, { useEffect, useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core/";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { FullListJobs, FullListResources,ListNews } from "components";
import { LoginContext, UserContext, HomeContext } from "contexts";
import { withRouter } from "react-router-dom";
import API from "../../../helpers/api";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    padding: 0,
    // padding: "3vh 0 0 0",
  },
  tabs: {
    height: "100%",
    boxShadow: "none",
    padding: 0,
  },

  tab: {
    height: "100%",
    alignSelf: "flex-end",
    //border: "1px solid #f0f0f0",
    borderTop: "none",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
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

const Home = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { loginStatus } = useContext(LoginContext);
  const {setIsUpdated, listSavedJobs, setListSavedJobs, setIsFullView} = useContext(HomeContext);
  const {
    setUserName,
    setUserLastName,
    setUserEmail,
    setAvatarProfile,
  } = useContext(UserContext);
  const [searchSettings, setSearchSettings] = useState([]);
  const [oppData, setOppData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  useEffect(() => {
    const triggerAPI = async () => {
      setIsFullView(false)
      const oppResponse = await API.getOpportunity();
      setOppData(oppResponse.response);
      const profileResponse = await API.getUserProfile();
      setUserName(profileResponse.response.first_name);
      setUserLastName(profileResponse.response.last_name);
      setUserEmail(profileResponse.response.emailId);
      const profileExtData = await API.getUserProfileExt();
      setAvatarProfile(profileExtData.response.avatar);
      setListSavedJobs(profileExtData.response.savedJobs);
      setSearchSettings(profileExtData.response.preferredIndustry);
    };
    if (loginStatus) {
      triggerAPI();
      setIsUpdated(false);
    }
  }, [loginStatus, 
    setOppData,
    setUserName,
    setUserLastName,
    setUserEmail,
    setAvatarProfile,
    setListSavedJobs,
    setIsFullView,
    setIsUpdated]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="default" >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.tabs}
            aria-label="full width tabs example"
            style={{ marginTop: 0, height: "58px"}}
          >
            <Tab label="Search" {...a11yProps(0)} className={classes.tab} />
            <Tab label="News" {...a11yProps(1)} className={classes.tab} />
            <Tab label="Resources" {...a11yProps(2)} className={classes.tab} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <FullListJobs data={oppData} savedJobs={listSavedJobs} searchSetting={searchSettings}/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ListNews />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <FullListResources />
          </TabPanel>
        </SwipeableViews>
      </div>
    </ThemeProvider>
  );
};


export default withRouter(Home);
