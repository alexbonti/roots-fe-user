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

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  registerBox: {
    width: "100%", // Fix IE 11 issue.
    height: "50vh",
    marginTop: theme.spacing(2),
    backgroundColor: "azure",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    marginTop: theme.spacing(1),
    borderRadius: "1rem",
    backgroundColor: "#087B94",
    color: "white",
  },
  developMessage: {
    position: "absolute",
    bottom: "1vh",
  },
  blockTop: {
    color: "black",
    fontSize: "20px",
    height: "20vh",
    backgroundColor: "rgba(8, 123, 148, 0.08)",
    margin: "30px 0",
    maxWidth: "100%",
  },
  text: {
    fontFamily: "Lato, Helvetica, Arial, sans-serif",
    fontSize: "large",
    fontWeight: "600",
    textAlign: "center",
  },
  containerButton: {
    lineHeight: "5rem",
    textAlign: "center",
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
  const { setLoginStatus, setAccessToken } = useContext(LoginContext);
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
    console.log(userDetails)
    const verificationStatus = await API.sendOTP(
      { "OTPCode": code },
      accessToken
    );
    if (verificationStatus === 200) {
      setUserProfile(userDetails);
      window.localStorage.setItem("accessToken", accessToken);
      setIsVerified(true);
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
        <Grid item xs={10} className={classes.text}>
          Your account has been verified
        </Grid>
        <Grid item xs={10} container justify="center">
          <Grid item xs={6}>
            <Button fullWidth className={classes.buttons}>
              <Link to="/onboarding" user={userProfile}>Home</Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={classes.registerBox}
        alignItems="center"
        justify="center"
      >
        <Grid
          item
          xs={10}
          container
          justify="space-between"
          alignItems="center"
          spacing={3}
          direction="column"
          className={classes.text}
        >
          A verification code has been sent to:
          <Typography variant="h5" color="secondary">
            {props.location.state.emailId}
          </Typography>
        </Grid>
        <Grid item xs={10} container alignItems="center" justify="center">
          <Grid item xs={6}>
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
          <Grid item xs={10} className={classes.containerButton}>
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
