import React from "react";
import { Typography, Grid } from "@material-ui/core/";
import { Spinner } from "components";
import ReactHtmlParser from "react-html-parser";
import { HomeContext } from "contexts";

export const NewsCard = props => {
  const { setDetailsNews, setIsFullViewNews } = React.useContext(HomeContext);

  const openFullNews = () => {
    setDetailsNews(props.data);
    setIsFullViewNews(true);
  };

  return props.data !== undefined ? (
    <>
      <Grid
        container
        justify="center"
        style={{ maxHeight: "165px", overflow: "hidden" }}
        onClick={() => openFullNews()}
      >
        <Grid item xs={4} md={4}>
          <img
            src={props.data.imageURL}
            alt={props.data.title}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid
          container
          item
          xs={8}
          md={3}
          justify="center"
          alignItems="center"
          style={{ padding: "1vh 1vw" }}
        >
          <Grid item xs={11}>
            <Typography variant="subtitle2">{props.data.title}</Typography>
          </Grid>
          <Grid item xs={11}>
            {ReactHtmlParser(props.data.content)}
          </Grid>
          <Grid item align="right" xs={11}>
            <Typography variant="caption">read more...</Typography>
          </Grid>
          <Grid item xs={11}>
            {props.data.datePublished.substring(0, 10)}
          </Grid>
        </Grid>
      </Grid>
        <Grid item xs={12} md={4}>
          <hr style={{ border: "3px solid rgb(249, 249, 249)" }} />
        </Grid>
    </>
  ) : (
    <Spinner />
  );
};
