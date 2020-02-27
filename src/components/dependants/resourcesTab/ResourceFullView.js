import React, { useContext } from "react";
import { Typography, Grid } from "@material-ui/core/";
import { HomeContext } from "contexts/index";
import { Spinner } from "components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

let applicationTheme = createMuiTheme({
  typography: {
    h6: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 18,
      color: "white",
    },
    body1: {
      fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
      fontSize: 14,
      color: "black",
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
    caption: {
      color: "black ",
      fontSize: "12px ",
      fontFamily: "Helvetica, sans-serif",
    },
    h5: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 21,
      color: "#00acc1",
    },
    subtitle1: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 10,
      color: "white",
    },
  },
});
export const ResourceFullView = props => {
  const { setIsFullViewResource } = useContext(HomeContext);

  //todo implement sharing features

  return props.hasOwnProperty("data") ? (
    <MuiThemeProvider theme={applicationTheme}>
      <Grid
        container
        alignItems="center"
        style={{
          padding: "3vh 1vw",
          backgroundColor: "#f8f8f8",
        }}
      >
        <Grid
          onClick={() => {
            setIsFullViewResource(false);
          }}
        >
          {"<"} Back to the list
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid
          container
          justify="space-between"
          item
          xs={11}
          style={{
            padding: "2vh 0",
          }}
        >
          <Grid item xs={11} md={10} lg={10}>
            <Typography variant="h6">{props.data.title}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={11} md={8} lg={8}>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: props.data.content }}
          />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  ) : (
    <Spinner />
  );
};
