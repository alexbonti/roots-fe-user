import React, { useState, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  Grid,
  createMuiTheme,
} from "@material-ui/core";
import { Header, notify } from "components";
import { ThemeProvider } from "@material-ui/styles";
import { API } from "helpers";
import { LoginContext } from "contexts";
import { TextHelper } from "helpers/index";

/*------------------------------------------------*/

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

/*------------------------------------------------*/

const ResetPasswordSecondStep = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [OTPCode, setOTPCode] = useState("");
  const [emailId, setEmailId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setAccessToken } = useContext(LoginContext);

  const [passwordErrorField, setPasswordErrorField] = useState(false);
  const [otpErrorField, setOtpErrorField] = useState(false);
  const [emailErrorField, setEmailErrorField] = useState(false);

  const sendResetPasswordEmail = () => {
    const data = {
      password,
      emailId,
      OTPCode,
    };

    const loginData = {
      emailId,
      password,
    };

    const triggerAPI = async () => {
      const response = await API.resetPasswordSecondStep(data);
      if (response) {
        notify("Password successfully changed");
        const loginDataResponse = await API.loginUser(
          loginData,
          setAccessToken
        );
        if (loginDataResponse) {
          setRedirect(true);
        }
      }
    };
    triggerAPI();
  };

  const validationCheck = () => {
    if (OTPCode.length === 0) {
      setOtpErrorField(true);
      return notify("OTP field can not be empty");
    }

    if (emailId.length === 0) {
      setEmailErrorField(true);
      return notify("email field can not be empty");
    }
    if (password.length === 0) {
      setPasswordErrorField(true);
      return notify("Password field can not be empty");
    }
    if (!TextHelper.validateEmail(emailId)) {
      setEmailErrorField(true);
      notify("Please provide a rigth email address");
    }

    if (password !== confirmPassword) {
      setPasswordErrorField(true);
      setPassword("");
      setConfirmPassword("");
      return notify("Passwords don't match.");
    }
    return sendResetPasswordEmail();

  };
  return redirect ? (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  ) : (
      <ThemeProvider theme={theme}>
        <Header />
        <Grid
          container
          alignItems="flex-end"
          justify="center"
          style={{
            backgroundColor: "rgb(234, 244, 246)",
            height: "20vh",
            paddingBottom: "1vh",
          }}
        >
          <Grid container item xs={10} style={{ paddingBottom: "3vh" }} >
            <Grid item xs={12}>
              <Typography
                style={{
                  fontFamily: `"Arial", "Helvetica", sans-serif`,
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Reset your password
            </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={10}>
            <TextField
              error={otpErrorField}
              margin="normal"
              required
              fullWidth
              name="otp"
              label="OTP code"
              id="otp"
              onChange={e => setOTPCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              error={emailErrorField}
              margin="normal"
              required
              fullWidth
              name="email"
              label="Registered Email"
              type="email"
              id="email"
              onChange={e => setEmailId(e.target.value)}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              error={passwordErrorField}
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              error={passwordErrorField}
              margin="normal"
              required
              fullWidth
              name="confirm password"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={10} style={{ padding: " 7vh 0" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={validationCheck}
              style={{
                color: "white",
                borderRadius: "25px",
                border: "1px solid #087b94",
                backgroundColor: "#087b94 !important",
                height: 55,
              }}
            >
              Send
          </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
};

export default withRouter(ResetPasswordSecondStep);
