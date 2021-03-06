import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
}));

function getSteps() {
  return [
    "",
    "",
    "",
  ];
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

export const StepperHorizontal= ( ) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel style={{backgroundColor: "transparent"}}>
       
                <Step><StepLabel></StepLabel></Step>
                <Step><StepLabel></StepLabel></Step>
                <Step><StepLabel></StepLabel></Step>

      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
