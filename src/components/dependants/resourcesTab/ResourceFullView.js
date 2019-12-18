import React, { useContext } from "react";
import { Typography, Grid } from "@material-ui/core/";
import { HomeContext } from "contexts/index";
import { Spinner } from "components";
import ReactHtmlParser from "react-html-parser";

export const ResourceFullView = props => {
  const { setIsFullViewResource } = useContext(HomeContext);

  //todo implement sharing features

  return props.hasOwnProperty("data") ? (
    <>
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
          {ReactHtmlParser(props.data.content)}
        </Grid>
      </Grid>
    </>
  ) : (
    <Spinner />
  );
};
