import React, { useState, useContext } from "react";
import {
  makeStyles,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Tabs, Tab, Box } from "@material-ui/core/";
import { NoExperience, GotExperience } from "components";
import PropTypes from "prop-types";
import { OnBoardingContext } from "contexts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log(props);
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

const CustomTabPanel = withStyles({
  div: {
    backgroundColor: "white !important",
  },
})(Tabs);

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
  buttonRight: {
    color: " #087b94",
    border: "2px solid #087b94",
    backgroundColor: "white",
    position: "relative",
    right: "30px",
    width: "39vw",
    borderRadius: "30px ",
    "&:focus": {
      color: "white",
      backgroundColor: " #087b94",
    },
  },

  bigIndicator: {
    display: "none",
  },

  buttonLeft: {
    color: " #087b94",
    border: "2px solid #087b94",
    borderRight: "none",
    backgroundColor: "white",
    width: "37vw",
    borderRadius: "30px 0 0 30px ",
    "&:focus": {
      color: "white",
      position: "relative",
      borderRadius: "30px ",
      backgroundColor: " #087b94",
    },
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
  //const [isStarted, setIsStarted] = useState(false);
  const [value, setValue] = useState(1);
  const [btnLeftIsClicked, setBtnLeftIsClicked] = useState(false);
  const [btnRightIsClicked, setBtnRightIsClicked] = useState(true);
  const { setUserHasExperience } = useContext(OnBoardingContext);

  //   const changeStep = () => {
  //     setIsStart(true);
  //   };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleStart = () => {
  //   if (!isStarted) {
  //     setIsStarted(true);
  //   }
  // };

  const styleIsClickedLeft = {
    color: "white",
    borderRadius: "30px ",
    backgroundColor: " #087b94 ",
    border: "2px solid #087b94",
    width: "42vw",
    transition: "all .1s ease-out",
    textTransform: "inherit",
    fontFamily: `"Arial ROunded MT Bold", "Helvetica", "Arial", sans-serif`,
  };

  const isNotClickedLeft = {
    color: "#087b94",
    borderRadius: "30px 0px  0px 30px ",
    backgroundColor: " transparent",
    border: "2px solid #087b94",
    borderRight: "none",
    width: "40vw",
    left: "0px",
    transition: "all .1s ease-out",
    textTransform: "inherit",
    fontFamily: `"Arial ROunded MT Bold", "Helvetica", "Arial", sans-serif`,
  };

  const styleIsClickedRight = {
    color: "white",
    position: "relative",
    right: "20px",
    borderRadius: "30px ",
    backgroundColor: " #087b94 ",
    border: "2px solid #087b94",
    width: "40vw",
    transition: "all .1s ease-out",
    textTransform: "inherit",
    fontFamily: `"Arial ROunded MT Bold", "Helvetica", "Arial", sans-serif`,
  };

  const isNotClickedRight = {
    color: "#087b94",
    borderRadius: "0px 30px 30px 0px ",
    backgroundColor: " transparent",
    border: "2px solid #087b94",
    borderLeft: "none",
    width: "40vw",
    right: "20px",
    transition: "all .1s ease-out",
    textTransform: "inherit",
    fontFamily: `"Arial ROunded MT Bold", "Helvetica", "Arial", sans-serif`,
  };

  const statusBtnLeft = btnLeftIsClicked
    ? styleIsClickedLeft
    : isNotClickedLeft;

  const statusBtnRight = btnRightIsClicked
    ? styleIsClickedRight
    : isNotClickedRight;

  // const tabsRender = isStarted ? (

  // ) : (
  //   ""
  // );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" className={classes.rootMain}>
          <Grid
            item
            xs={11}
            container
            justify="flex-start"
            style={{ paddingBottom: "14px" }}
          >
            <Typography
              style={{
                fonstSize: "16px",
                fontFamily: `"Arial", "Helvetica", sans-serif`,
                fontWeight: "bold",
              }}
            >
              {" "}
              First of all,
              <br />
              have you got experience before ?
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify="center"
            style={{ paddingBottom: "63px" }}
          >
            <CustomTabPanel
              value={value}
              indicatorColor="primary"
              classes={{ indicator: classes.bigIndicator }}
              onChange={handleChange}
            >
              <Tab
                label="Yes, I have"
                {...a11yProps(0)}
                style={statusBtnLeft}
                onClick={() => {
                  setBtnRightIsClicked(false);
                  setBtnLeftIsClicked(true);
                  setUserHasExperience(true);
                }}
              />
              <Tab
                label="No, I am new"
                {...a11yProps(1)}
                style={statusBtnRight}
                onClick={() => {
                  setBtnRightIsClicked(true);
                  setBtnLeftIsClicked(false);
                  setUserHasExperience(false);
                }}
              />
            </CustomTabPanel>
          </Grid>
          <Grid item container justify="center">
            <TabPanel value={value} index={0}>
              <GotExperience />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <NoExperience />
            </TabPanel>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
