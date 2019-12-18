import React from "react";
import { Typography, Grid } from "@material-ui/core/";
import { Spinner } from "components";
import ReactHtmlParser from "react-html-parser";
import {HomeContext} from "contexts";

export const LargeNewsCard = props => {
  const {setDetailsNews, setIsFullViewNews} = React.useContext(HomeContext);


  const openFullNews = () => {
    setDetailsNews(props.data);
    setIsFullViewNews(true);
  }
  return props.data !== undefined ? (
    <>
      <Grid container justify="center" onClick={()=> openFullNews()}>
        <Grid item xs={12}>
          <img
            src={props.data.imageURL}
            alt={props.data.title}
            style={{ width: "100%", height: "30vh" }}
          />
        </Grid>
        <Grid container item xs={11}>
          <Grid item xs={12}>
            <Typography variant="h6">{props.data.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            {props.data.datePublished.substring(0, 10)}
          </Grid>
          <Grid item xs={12}>
            {ReactHtmlParser(props.data.content.substring(0, 150))}
          </Grid>
          <Grid item align="right" xs={12}>
            <Typography  variant="caption">read more...</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr style={{ border: "5px solid rgb(249, 249, 249)" }} />
        </Grid>
      </Grid>
    </>
  ) : (
    <Spinner />
  );
};
