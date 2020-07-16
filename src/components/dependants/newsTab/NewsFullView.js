import React from "react";
import { Typography, Grid } from "@material-ui/core/";
import { Spinner } from "components";
import { HomeContext } from "contexts";
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
      fontSize: 16,
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
export const NewsFullView = props => {
  const { setIsFullViewNews } = React.useContext(HomeContext);

  return props.data !== undefined ? (
    <MuiThemeProvider theme={applicationTheme}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography
            variant="body1"
            style={{
              padding: "3vh 2vw",
              backgroundColor: "rgb(248, 248, 248)",
            }}
            onClick={() => {
              setIsFullViewNews(false);
            }}
          >
            {" "}
            {" < "} Back to the News{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img
            src={props.data.imageURL}
            alt={props.data.title}
            style={{ height: "33vh", width: "100%" }}
          />
        </Grid>
        <Grid item xs={11} style={{ padding: "1vh 0" }}>
          <Typography variant="h6">{props.data.title}</Typography>
        </Grid>
        <Grid item xs={11} style={{ padding: "1vh 0" }}>
          <Typography variant="body1">
            {props.data.datePublished.substring(0, 10)}
          </Typography>
        </Grid>
        <Grid item xs={11} style={{ padding: "3vh 0 1vh 0" }}>
          <Typography
            dangerouslySetInnerHTML={{ __html: props.data.content }}
            variant="body1"
          />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  ) : (
    <Spinner />
  );
};
