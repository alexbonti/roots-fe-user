import React, { useState, useContext } from "react";
import { Link,  withRouter } from "react-router-dom";
import {
  makeStyles,
  Button,
  Grid,
  createMuiTheme,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { LoginContext, UserContext } from "../../../contexts";

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


const RegisterSuccess = ({ ...props }) => {
  const classes = useStyles();
  const [isVerified] = useState(false);
  const { setLoginStatus } = useContext(LoginContext);
  const { userProfile, } = useContext(UserContext);


  React.useEffect(() => {
    if (isVerified) {
      setLoginStatus(true);
    }
  }, [isVerified, setLoginStatus]);

 

  const content =  (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={classes.registerBox}
        alignItems="center"
        justify="center"
        
      >
        <Grid item xs={10} md={7} className={classes.text} style={{paddingTop: "5vh", textAlign:"center", height: "30vh"}}>
          Your account has been verified
        </Grid>
        <Grid item xs={10} md={7} alignItems="center"container justify="center">
          <Grid item xs={10} style={{paddingTop: "5vh"}}>
            <Button
              component={Link}
              user={userProfile}
              to="/onboarding"
              fullWidth
              className={classes.buttons}
            >
              Setup Profile
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) ;

 

  return content;
};

export default withRouter(RegisterSuccess);
