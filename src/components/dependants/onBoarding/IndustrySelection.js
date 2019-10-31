import React, { useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, TextField, Button, Box} from "@material-ui/core/";
import { OnBoardingContext } from "contexts";
import {
  NoExperience,
  GotExperience,
  CurtainIndustrySelection,
} from "components";
import PropTypes from "prop-types";

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

export const IndustrySelection = props => {
  const classes = useStyles();
  const [isStarted, setIsStarted] = useState(false);
  const [value, setValue] = React.useState(0);

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" style={{backgroundColor: "white", padding: "4vh 0" }} >
          <Grid item >
            <Typography variant="body1">Which industry are you interested in ?</Typography>
          </Grid>
          <Grid item xs={10}>
            <CurtainIndustrySelection />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
