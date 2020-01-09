import React from "react";
import { Typography, Grid } from "@material-ui/core/";
import { Spinner } from "components";
import ReactHtmlParser from "react-html-parser";
import { HomeContext } from "contexts";

export const NewsFullView = props => {
  const { setIsFullViewNews } = React.useContext(HomeContext);

  return props.data !== undefined ? (
    <>
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
          {ReactHtmlParser(props.data.content)}
        </Grid>
      </Grid>
    </>
  ) : (
    <Spinner />
  );
};