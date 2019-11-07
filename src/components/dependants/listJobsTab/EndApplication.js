import React, { useContext} from "react";
import { Link } from 'react-router-dom'
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Button } from "@material-ui/core/";
import {UserContext, HomeContext} from "contexts";

const useStyles = makeStyles(theme => ({
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


export const EndApplication = (props) => {
  const {userProfile} = useContext(UserContext);
  const {setIsFullView} = useContext(HomeContext)
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justify="center"
          alignItems="flex-start"
          style={{
            backgroundColor: "white",
            padding: "10vh 0 0 0",
            height: "55vh",
          }}
        >
          <Grid item xs={8}>
            <Typography variant="h6">
              Congratulation, {userProfile.first_name}. <br /> Your application has been sent successfully.<br/>
              Good Luck
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.buttons}
              onClick={()=> setIsFullView(false)}
            >
              <Link to="/" style={{textDecoration: "none", color: "white"}}> Search Opportunities </Link>
            </Button>
          </Grid>
        </Grid>
        <Grid style={{height: "35vh", backgroundColor: "white"}} />
      </ThemeProvider>
    </>
  );
};
