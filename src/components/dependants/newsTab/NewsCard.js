import React from "react";
import { Typography, Grid } from "@material-ui/core/";
import { Spinner } from "components";
import { HomeContext } from "contexts";
import PropTypes from "prop-types";

export const NewsCard = ({ data }) => {
  const { imageURL, title, datePublished } = data;

  const { setDetailsNews, setIsFullViewNews } = React.useContext(HomeContext);

  const openFullNews = () => {
    setDetailsNews(data);
    setIsFullViewNews(true);
  };

  return data !== undefined ? (
    <>
      <Grid container justify="center" onClick={() => openFullNews()}>
        <Grid item xs={4} md={4}>
          <img
            src={imageURL}
            alt={title}
            style={{
              maxHeight: 100,
              width: "95%",
              height: "100%",
              padding: "5px 10px",
            }}
          />
        </Grid>
        <Grid
          container
          item
          xs={8}
          md={3}
          justify="center"
          //alignItems="center"
          style={{ padding: "0 1vw" }}
        >
          <Grid item xs={11}>
            <Typography variant="h5" style={{ fontSize: "16px" }}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={11} style={{ maxHeight: 100, overflow: "hidden" }}>
            <Typography
              variant="body1"
            // dangerouslySetInnerHTML={{ __html: content}}
            >
              Here there's some test
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body1">
              {datePublished.substring(0, 10)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <hr style={{ border: "4px solid rgb(249, 249, 249)", margin: 0 }} />
      </Grid>
    </>
  ) : (
      <Spinner />
    );
};

NewsCard.prototype = {
  data: PropTypes.object,
  imageURL: PropTypes.string,
  title: PropTypes.string,
  datePublished: PropTypes.string,
  content: PropTypes.string,
};
