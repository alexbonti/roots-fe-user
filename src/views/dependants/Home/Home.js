import React, { useEffect, useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core/";
import PropTypes from "prop-types";
import { FullListJobs, FullListResources, ListNews, Spinner } from "components";
import { LoginContext, UserContext, HomeContext } from "contexts";
import { withRouter } from "react-router-dom";
import API from "../../../helpers/api";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
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

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  //CONTEXT
  const { listSavedJobs, setIsFullViewApplied, setListSavedJobs, setIsFullView } = useContext(
    HomeContext
  );
  const {
    setUserName,
    setUserLastName,
    setUserEmail,
    setAvatarProfile,
  } = useContext(UserContext);
  const { loginStatus } = useContext(LoginContext);

  // STATE
  const [searchSettings, setSearchSettings] = useState([]);
  const [oppData, setOppData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //API CALLS
  useEffect(() => {
    if (loginStatus) {
      const triggerAPI = async () => {
        setIsFullView(false);
        setIsFullViewApplied(false);

        const profileExtData = await API.getUserProfileExt();
        if (profileExtData) {
          setListSavedJobs(profileExtData.response.savedJobs);
          setAvatarProfile(profileExtData.response.avatar);
          setSearchSettings(profileExtData.response.preferredIndustry);
        }
        const oppResponse = await API.getOpportunity();
        if (oppResponse) {
          setOppData(oppResponse.response);
        }
        const profileResponse = await API.getUserProfile();
        if (profileResponse) {
          setUserName(profileResponse.response.first_name);
          setUserLastName(profileResponse.response.last_name);
          setUserEmail(profileResponse.response.emailId);
          //setUserPassword(profileResponse.response.password);
        }

        Promise.all([profileResponse, profileExtData, oppResponse])
          .then(res => res)
          .catch(err => err);
      };
      triggerAPI();
    }

  }, [
    setOppData,
    setUserName,
    setUserLastName,
    setUserEmail,
    setAvatarProfile,
    setListSavedJobs,
    setIsFullView,
    loginStatus,
    setIsFullViewApplied
  ]);

  return Array.isArray(oppData) ? (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.tabs}
            aria-label="full width tabs example"
            style={{ marginTop: 0, height: "58px" }}
          >
            <Tab label="News" {...a11yProps(0)} className={classes.tab} />
            <Tab label="Jobs" {...a11yProps(1)} className={classes.tab} />
            <Tab label="Resources" {...a11yProps(2)} className={classes.tab} />
          </Tabs>
        </AppBar>
        {/* <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        > */}

        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListNews />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <FullListJobs
            data={oppData}
            savedJobs={listSavedJobs}
            searchSetting={searchSettings}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <FullListResources />
        </TabPanel>
        {/* </SwipeableViews> */}
      </div>
    </ThemeProvider>
  ) : <Spinner />;
};

export default withRouter(Home);
// Home.PropTypes = {
//   data:
// }
