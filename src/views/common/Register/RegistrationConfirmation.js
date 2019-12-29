import React, { useState, useContext } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  makeStyles,
  Button,
  Grid,
  TextField,
  createMuiTheme,
  Typography,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { API } from "helpers/index";
import { LoginContext, UserContext } from "../../../contexts";
//import Image from "../../../helpers/img/RootLogo.svg";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  registerBox: {
    width: "100%", // Fix IE 11 issue.
  },

  buttons: {
    borderRadius: "25px",
    backgroundColor: "#087B94",
    color: "white",
    height: "55px",
  },
  text: {
    fontFamily: "Arial Round, Helvetica, Arial, sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
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

const RegistrationConfirmation = ({ ...props }) => {
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { setLoginStatus } = useContext(LoginContext);
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [hasGotRights] = useState(
    props.location.state &&
      props.location.state.hasOwnProperty("accessToken") &&
      !props.location.state.emailVerified
      ? true
      : false
  );

  let accessToken =
    props.location.state && props.location.state.hasOwnProperty("accessToken")
      ? props.location.state.accessToken
      : "";

  const userDetails =
    props.location.state && props.location.state.hasOwnProperty("userDetails")
      ? props.location.state.userDetails
      : "";

  React.useEffect(() => {
    if (isVerified) {
      setLoginStatus(true);
    }
  }, [isVerified, setLoginStatus]);

  const sendCode = async () => {
    const verificationStatus = await API.sendOTP(
      { "OTPCode": code },
      accessToken
    );
    if (verificationStatus === 200) {
      window.localStorage.setItem("accessToken", accessToken);
      setIsVerified(true);
      API.updateUserPreferences({
        "avatar": "string",
        "preferredLocation": "",
        "skills": [],
        "preferredIndustry": [],
        "resumeURL": "",
        "coverLetter": "",
      });
      setUserProfile(userDetails);
    }
  };

  const content = isVerified ? (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={classes.registerBox}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={10} className={classes.text} style={{paddingTop: "5vh", textAlign:"center"}}>
          Your account has been verified
        </Grid>
        <Grid item xs={10} container justify="center">
          <Grid item xs={10} style={{paddingTop: "5vh"}}>
            <Button
              component={Link}
              user={userProfile}
              to="/onboarding"
              fullWidth
              className={classes.buttons}
            >
              Home
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.registerBox} justify="center">
        <Grid item xs={11} container  style={{paddingTop: "5vh"}}>
            <Typography className={classes.text}>
              A verification code has been sent to: <br />{props.location.state.emailId}
            </Typography>
        </Grid>
        <Grid item xs={10} container justify="center">
          <Grid item xs={9}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otpCode"
              label="Verification Code"
              name="Verification Code"
              onChange={e => setCode(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={10} style={{paddingTop: "5vh"}}>
            <Button
              fullWidth
              className={classes.buttons}
              onClick={() => {
                sendCode();
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>

    
    </ThemeProvider>
  );

  if (!hasGotRights) {
    return <Redirect to="/" />;
  }

  return content;
};

export default withRouter(RegistrationConfirmation);
