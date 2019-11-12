import React, { useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Tabs, Tab, Box } from "@material-ui/core/";
import { NoExperience, GotExperience } from "components";
import PropTypes from "prop-types";
import { OnBoardingContext } from "contexts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  rootMain: {
    backgroundColor: "white",
    padding: "5vh 0",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  buttons: {
    color: "white",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "4vh 0",
    width: "37vw",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const StartOnBoarding = props => {
  const classes = useStyles();
  const [isStarted, setIsStarted] = useState(false);
  const [value, setValue] = React.useState(0);
  const {setUserHasExperience } = useContext(
    OnBoardingContext
  );

  //   const changeStep = () => {
  //     setIsStart(true);
  //   };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStart = () => {
    if (!isStarted) {
      setIsStarted(true);
    }
  };

  const tabsRender = isStarted ? (
    <Grid item container justify="center">
      <TabPanel value={value} index={0}>
        <GotExperience />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NoExperience />
      </TabPanel>
    </Grid>
  ) : (
    <Grid item xs={10} container spacing={2} justify="center">
      <Grid item container justify="center">
        <Typography variant="body1" align="center">
          {" "}
          Or
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body1" align="center">
          You can always complete it <a href="http://linktosomething">later</a>
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justify="center"
          className={classes.rootMain}
          spacing={2}
        >
          <Grid item xs={9} container justify="flex-start">
            <Typography variant="body1">
              {" "}
              First of all,
              <br />
              have you got experience before ?
            </Typography>
          </Grid>
          <Grid container item xs={12} justify="space-evenly">
            <Tabs
              value={value}
              onChange={handleChange}
              onClick={() => {
                handleStart();
              }}
              aria-label="simple tabs example"
            >
              <Tab
                label="Yes, I have"
                {...a11yProps(0)}
                className={classes.buttons}
                onClick={() => {
                  setUserHasExperience(true);
                }}
                style={{ borderRadius: "15px 0  0 15px" }}
              />
              <Tab
                label="No, I'm new"
                {...a11yProps(1)}
                className={classes.buttons}
                onClick={() => {
                  setUserHasExperience(false);
                }}
                style={{ borderRadius: "0px 15px 15px 0" }}
              />
            </Tabs>
          </Grid>
          {tabsRender}
        </Grid>
      </ThemeProvider>
    </>
  );
};
