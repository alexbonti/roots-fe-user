import React, { useEffect, useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Button } from "@material-ui/core/";
import MyDropzone from "../DropDrag";
import { OnBoardingContext, LoginContext, UserContext } from "contexts";
import { API } from "helpers";

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
    margin: "1vh 0",
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

export const AvatarPictureUpload = () => {
  const classes = useStyles();

  const {
    activeStep,
    setActiveStep,
    setIsUpdated,
    positionTitle,
    location,
    companyName,
    startDate,
    endDate,
    industryField,
    avatarPictureURL,
    userHasExperience
  } = useContext(OnBoardingContext);

  const { loginStatus } = useContext(LoginContext);
  const { userProfile } = useContext(UserContext);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  console.log(activeStep);

  const sendOnBoardingDetails = async () => {
    if (loginStatus) {
      let workExpData;
      
      if(startDate && endDate !== ""){
        workExpData = {
          workExperience: {
            positionTitle,
            companyName,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            description: "sda",
          },
        };
      }

      let userPreferencesData = {
        avatar: avatarPictureURL,
        preferredLocation: location,
        skills: ["string"],
        preferredIndustry: industryField,
      };

      let updateFirstLoginData = {
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        firstLogin: false,
      };

      if (userHasExperience) {
        console.log('here');
        const workExpApiData = await API.updateWorkExp(workExpData);
        console.log("workExpApiData", workExpApiData);

        const userPreferencesApiData = await API.updateUserPreferences(
          userPreferencesData
        );
        console.log("userPreferencesApiData", userPreferencesApiData);

        const userProfileApiData = await API.updateUserProfile(
          updateFirstLoginData
        );
        console.log("userProfileApiData", userProfileApiData);
        //TODO handle the change of tab in case there's am errpr from BE!
        handleNext();
      } else {
        const userPreferencesApiData = await API.updateUserPreferences(
          userPreferencesData
        );
        console.log("userPreferencesApiData", userPreferencesApiData);
        const userProfileApiData = await API.updateUserProfile(
          updateFirstLoginData
        );
        console.log("userProfileApiData", userProfileApiData);
        //TODO handle the change of tab in case there's am errpr from BE!
        handleNext();
      }

      console.log(activeStep);

      setIsUpdated(false);
    }
    setIsUpdated(true);
  };

  const confirmButton =
    avatarPictureURL !== "" ? (
      <Grid item xs={8}>
        <Button
          fullWidth
          variant="contained"
          className={classes.buttons}
          onClick={() => {
            sendOnBoardingDetails();
          }}
        >
          Confirm
        </Button>
      </Grid>
    ) : (
      ""
    );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justify="center"
          style={{ backgroundColor: "white", height: "50vh", padding: "2vh" }}
          spacing={2}
          alignItems="flex-start"
        >
          <Grid item xs={9}>
            <Typography variant="body1">Add your profile photo</Typography>
          </Grid>
          <Grid item xs={10}>
            <MyDropzone data={"photo"}/>
          </Grid>
          {confirmButton}
          <Grid item>
            <Typography variant="body2">
              You can always do it <a href="#">later</a>
            </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
