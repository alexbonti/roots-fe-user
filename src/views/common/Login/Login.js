import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  makeStyles,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { LoginContext } from "contexts";
import { notify } from "components";
import { API } from "helpers/index";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Image from "../../../helpers/img/Root-logo2.png";

let theme = createMuiTheme({
  palette: {
    primary: { main: "#007D98" },
    secondary: { main: "#11cb5f" },
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.dark,
    },
  },
  header: {
    paddingBottom: "1vh ",
  },
  footer: {
    backgroundColor: "#363635",
    color: "#f0f0f0",
    fontSize: ".3rem",
  },

  creator: {
    fontSize: ".7rem",
    padding: ".5rem",
  },

  divider: {
    border: "1px solid #FFD923",
    width: "65%",
    marginLeft: "10%",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  secondaryText: {
    color: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    height: "55px",
    boxShadow: "none",
  },
  buttonRegister: {
    color: "#087b94",
    borderRadius: "25px",
    border: "2px solid #087b94",
    backgroundColor: "white",
    height: "55px",
    boxShadow: "none",
  },
  developMessage: {},
  inputText: {
    ".MuiInput-underline:after": {
      borderBottom: "2px solid green",
    },
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { devMode, loginStatus, setAccessToken } = useContext(LoginContext);

  const performLogin = async () => {
    const data = {
      emailId: emailId.toLowerCase(),
      password,
    };
    const otp = await API.loginUser(data, setAccessToken);
    if (!otp) {
      notify("Email or Password are wrong");
    }
  };

  const validationCheck = () => {
    if (devMode) {
      return performLogin();
    }
    if (!loginStatus) {
      const email = emailId;
      const pwd = password;
      let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailPatternTest = emailPattern.test(email);
      if (emailPatternTest && pwd) {
        performLogin();
        return true;
      } else if (emailPatternTest === undefined && pwd === undefined) {
        notify("Email or password must not be empty!");
        return false;
      } else if (!emailPatternTest === undefined) {
        notify("Email must not be empty!");
        return false;
      } else if (!emailPatternTest && email.length > 0) {
        notify("Invalid email!");
        return false;
      } else if (!pwd) {
        notify("Password must not be empty!");
        return false;
      }
    }
  };

  let content = (
    <div style={{display: "flex", justifyContent: "center"}}>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" alignItems="center"item xs={12} md={4}>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            className={classes.header}
            xs={12} 
          >
            <Grid
              item
              xs={12}

              container
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} align="center">
                <img
                  src={Image}
                  alt="logo"
                  style={{ height: "100%", width: "100%",padding:'5px',paddingBottom:'-30px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="flex-start"
            className={classes.body}
          >
            <Grid className={classes.loginBox} item xs={10} container>
              <form noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => setEmailId(e.target.value)}
                  autoFocus
                  className={classes.inputText}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <Typography
                  component={Link}
                  to="/ResetPassword"
                  color="primary"
                  variant="caption"
                >
                  {" "}
                  Forgot password?
                </Typography>
              </form>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={8}
              justify="center"
              alignItems="center"
              style={{ paddingTop: "5vh" }}
            >
              <Grid item xs={10} sm={8} style={{ paddingBottom: "1vh" }}>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.buttons}
                  onClick={validationCheck}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "2vh" }}>
                <Typography
                  align="center"
                  display="block"
                  style={{
                    fontFailmily: "Arial Rounded MT, sans-serif",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#007D97",
                  }}
                >
                  or
                </Typography>
              </Grid>
              <Grid
                item
                xs={10}
                sm={8}
                style={{ paddingTop: "2vh", paddingBottom: "41.3px" }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.buttonRegister}
                  component={Link}
                  to="/register"
                >
                  SIGN UP
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
  return content;
};
