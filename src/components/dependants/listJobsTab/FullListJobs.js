import React from "react";
import {  createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid} from "@material-ui/core/";



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

export const FullListJobs
 = () => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" style={{backgroundColor: "white", padding: "4vh 0" }} >
          <Grid item >
            <Typography variant="body1">Which industry are you interested in ?</Typography>
          </Grid>
          <Grid item xs={10}>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
