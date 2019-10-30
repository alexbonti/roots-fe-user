import React, { useEffect, useState, useContext } from "react";
// import PropTypes from "views/dependants/OnBoarding/prop-types";
// import SwipeableViews from "views/dependants/OnBoarding/react-swipeable-views";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Button,
} from "@material-ui/core/";
import { UserContext, LoginContext, OnBoardingContext } from "contexts";
import { API } from "helpers";
import { StartOnBoarding } from "components";

const useStyles = makeStyles(theme => ({
  topper: {
    height: "10vh",
    backgroundColor: "white",
  },
  secondTopper: {
    backgroundColor: "rgb(234, 244, 246,1 )",
    height: "22vh",
  },
  title: {
    height: "10vh",
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
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

function getSteps() {
  return ["", "", ""];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown stepIndex";
  }
}

export const OnBoarding = props => {
  const classes = useStyles();
  const { activeStep, setActiveStep, isStart } = useContext(OnBoardingContext);
  const steps = getSteps();
  const { loginStatus, accessToken } = useContext(LoginContext);
  const { userProfile, setUserProfile, isUpdated, setIsUpdated } = useContext(
    UserContext
  );

  useEffect(() => {
    if (loginStatus) {
      const triggerAPI = async () => {
        const profileData = await API.getUserProfile(accessToken);
        setUserProfile(profileData.response);
        console.log("context profile", userProfile);
      };
      triggerAPI(accessToken);
    }
  }, [accessToken, loginStatus, setUserProfile]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const buttonStepper =
    isStart ? (
      <Grid item xs={10}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.buttons}
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Grid>
    ) : (
      ""
    );
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container className={classes.topper} alignItems="flex-end">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.backButton}
          >
            {"<"} Back
          </Button>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ backgroundColor: "rgb(234, 244, 246,1 )", height: "22vh" }}
        >
          <Grid
            container
            item
            xs={11}
            justify="center"
            alignItems="center"
            style={{ height: "15vh" }}
          >
            <Typography variant="h5">
              Welcome, {userProfile.first_name}. <br />
              Let's get your profile ready.
            </Typography>
          </Grid>
          <Grid
            style={{
              backgroundColor: "rgb(234, 244, 246,1 )",
              height: "5vh",
              width: "100vw",
            }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              style={{
                backgroundColor: "transparent",
                padding: "unset",
              }}
            >
              <Step color="secondary">
                <StepLabel></StepLabel>
              </Step>
              <Step>
                <StepLabel></StepLabel>
              </Step>
              <Step>
                <StepLabel></StepLabel>
              </Step>
            </Stepper>
          </Grid>
          <StartOnBoarding />
          <Grid
            container
            style={{ backgroundColor: "white", height: "20vh" }}
            justify="center"
            alignItems="flex-end"
          >
            {buttonStepper}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
