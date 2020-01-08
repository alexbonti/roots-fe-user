import React, { useState } from "react";
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

const ResetPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [emailErrorField, setEmailErrorField] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const sendResetPasswordEmail = () => {
    const data = {
      emailId,
    };

    const triggerAPI = async () => {
      const response = await API.resetPasswordFirstStep(data);
      if (response) {
        console.log(response);
        setRedirect(true);
      } else {
        console.log("error");
      }
    };
    triggerAPI();
  };

  const validationCheck = () => {
    if (emailId.length < 0 || emailId === "") {
      setEmailErrorField(true);
      return notify("email field can not be empty");
    } else {
      setEmailErrorField(false);
    }

    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailPatternTest = emailPattern.test(emailId);
    if (!emailPatternTest) {
      setEmailErrorField(true);
      notify("Please provide a rigth email address");
    } else {
      setEmailErrorField(false);
    }

    if (emailPatternTest) {
      return sendResetPasswordEmail();
    }
  };
  return redirect ? (
    <Redirect
      to={{
        pathname: "/ResetPasswordSecondStep",
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
          height: "24vh",
          paddingBottom: "1vh",
        }}
      >
        <Grid container item xs={10}>
          <Typography
            style={{
              fontFamily: `"Arial", "Helvetica", sans-serif`,
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Send an email to reset your password
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
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
              height: "55px"
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default withRouter(ResetPassword);
