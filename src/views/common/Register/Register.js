import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  Typography,
  Button,
  Grid,
  createMuiTheme,
} from "@material-ui/core";
import { notify } from "components";
import API from "../../../helpers/api";
import { ThemeProvider } from "@material-ui/styles";
import { Header } from "../../../components/dependants/Header";
import { withRouter, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "4vh 0",
    height: "55px",
    boxShadow: "none",
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
const Register = () => {
  // const { setLoginStatus } = React.useContex(LoginContext);
  const classes = useStyles();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [userDetails, setUserDetails] = useState("");

  /**
   * Error Fields states
   * @error default is false
   */
  const [emailErrorField, setEmailErrorField] = useState(false);
  const [passwordErrorField, setPasswordErrorField] = useState(false);
  const [firstNameErrorField, setFirstNameErrorField] = useState(false);
  const [lastNameErrorField, setLastNameErrorField] = useState(false);

  // const { setOpenModal } = useContext(LoginContext);

  const registerUser = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      emailId,
      password,
    };

    const triggerAPI = async () => {
      const registerData = await API.registerUser(data);
      console.log("triggerAPI -> registerData", registerData)
      if (registerData) {
        console.log(registerData);
        setAccessToken(registerData.response.accessToken);
        setEmailVerified(registerData.response.userDetails.emailVerified);
        setUserDetails(registerData.response.userDetails);
        setRedirect(true);
      } else {
        console.log("error");
      }
    };
    triggerAPI();
  };

  const validationCheck = () => {
    if (firstName.length < 0 || firstName.length === 0) {
      setFirstNameErrorField(true);
      return notify("first name field can not be empty");
    } else {
      setFirstNameErrorField(false);
    }

    if (lastName.length < 0 || lastName.length === 0) {
      setLastNameErrorField(true);
      return notify("last name field can not be empty");
    } else {
      setLastNameErrorField(false);
    }

    if (emailId.length < 0 || emailId === "") {
      setEmailErrorField(true);
      return notify("email field can not be empty");
    } else {
      setEmailErrorField(false);
    }
    if (password.length < 0 || confirmPassword.length < 0) {
      setPasswordErrorField(true);
      return notify("Password field can not be empty");
    } else {
      setPasswordErrorField(false);
    }

    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailPatternTest = emailPattern.test(emailId);
    if (!emailPatternTest) {
      setEmailErrorField(true);
      notify("Please provide a rigth email address");
    } else {
      setEmailErrorField(false);
    }
    if (password !== confirmPassword) {
      setPasswordErrorField(true);
      setPassword("");
      setConfirmPassword("");
      return notify("Passwords don't match.");
    } else {
      setPasswordErrorField(false);
    }
    if (emailPatternTest) {
      return registerUser();
    }
  };

  let content = redirect ? (
    <Redirect
      to={{
        pathname: "/registerSuccess",
        state: { accessToken, emailVerified, emailId, userDetails },
      }}
    />
  ) : (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Grid style={{ height: "9vh" }} />
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ backgroundColor: "rgb(234, 244, 246,1 )", height: "15vh" }}
        >
          <Grid item xs={10} md={7}>
            <Typography
              style={{
                fontFamily: "\"Arial Rounded MT\", sans-serif",
                fontSize: "21px",
                fontWeight: "bold",
              }}
            >
              {"Let's start"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-evenly" alignItems="center">
          <Grid item xs={10} md={7}>
            <form noValidate>
              <TextField
                margin="normal"
                error={firstNameErrorField}
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="email"
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />{" "}
              <TextField
                error={lastNameErrorField}
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="email"
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                error={emailErrorField}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmailId(e.target.value)}
              />
              <TextField
                error={passwordErrorField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <TextField
                error={passwordErrorField}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
              />
            </form>
          </Grid>
          <Grid item xs={10} md={7} style={{ paddingTop: "5vh" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={validationCheck}
              className={classes.buttons}
            >
              SIGN UP
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );

  return content;
};

export default withRouter(Register);
