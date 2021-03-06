import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import {
  StartOnBoarding,
  IndustrySelection,
  AvatarPictureUpload,
  EndOnBoarding,
  Spinner
} from "components";
import { withRouter, Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  topper: {
    backgroundColor: "#F7F6F6",
    height: "6vh"
  },
  secondTopper: {
    backgroundColor: "rgb(234, 244, 246,1 )",
    height: "20vh",
  },
  title: {
    height: "10vh",
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
    height: "55px"
  },
  backButton: {
    fontSize: "10px",
    textTransform: "inherit"
  },
}));


function getSteps() {
  return ["", "", ""];
}

const OnBoarding = withRouter(() => {
  const classes = useStyles();
  const { activeStep, setActiveStep, isStart } = useContext(OnBoardingContext);
  const steps = getSteps();
  const { loginStatus, accessToken } = useContext(LoginContext);
  const { userProfile, setUserProfile, userProfileSetupComplete } = useContext(
    UserContext
  );

  useEffect(() => {
    if (loginStatus) {
      (async () => {
        const profileData = await API.getUserProfile(accessToken);
        if (profileData) setUserProfile(profileData.response);
      })();
    }
  }, [accessToken, loginStatus, setUserProfile]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };


  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  if (userProfileSetupComplete === undefined) return <Spinner />;

  if (userProfileSetupComplete) return <Redirect to="/home" />;

  const buttonStatusDisabled = activeStep < 1 ? true : false;
  // ---------------------button stepper------------------------

  const buttonStepper = isStart ? (
    <Grid item xs={11}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.buttons}
        onClick={handleNext}
      >
        {activeStep === steps.length - 1 ? "Finish" : "Continue"}
      </Button>
    </Grid>
  ) : null;

  //--------------------------------------------------------------
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: return startContent;
      case 1: return industryContent;
      case 2: return <AvatarPictureUpload />;
      case 3: return <EndOnBoarding />;
      default: return "Sorry wrong page!";
    }
  }
  //-------------------content------------------------------------

  const startContent = (
    <>
      <StartOnBoarding />
      <Grid
        container
        style={{ backgroundColor: "white", height: "7vh" }}
        justify="center"
        alignItems="flex-end"
      >
        {buttonStepper}
      </Grid>
    </>
  );

  const industryContent = (
    <>
      <IndustrySelection />
    </>
  );

  const mainContent =
    activeStep > 2 ? (
      <EndOnBoarding />
    ) :
      <>
        <Grid container className={classes.topper} alignItems="flex-end">
          <Button onClick={handleBack} className={classes.backButton} disabled={buttonStatusDisabled}>
            {"<"} Back
          </Button>
        </Grid>

        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
          style={{ height: "15vh", backgroundColor: "rgb(234, 244, 246)" }}
        >
          <Grid item xs={11}>
            <Typography variant="h6">
              Welcome, {userProfile.first_name}. <br />
              Let&apos;s get your profile ready.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{
            height: "5vh",
            width: "100vw",
            position: "relative",
            top: "-13px"
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
            <Step>
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
        {getStepContent(activeStep)}
      </>;

  return <>{mainContent}</>;
});

export default OnBoarding;
