import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core/";
import { Spinner } from "components";
import { HomeContext } from "contexts";
import PropTypes from "prop-types";
import { TextHelper } from "helpers/index"

export const LargeNewsCard = (props) => {
  const { setDetailsNews, setIsFullViewNews } = React.useContext(HomeContext);
  const [newsData] = useState(props.data);

  const openFullNews = () => {
    setDetailsNews(props.data);
    setIsFullViewNews(true);
  };
  return newsData !== undefined ? (
    <>
      <Grid container justify="center" onClick={() => openFullNews()}>
        <Grid item xs={12} md={7}>
          <img
            src={newsData?.imageURL}
            //alt={newsData?.title}
            style={{ width: "100%", height: "30vh" }}
          />
        </Grid>
        <Grid container item xs={11} md={7}>
          <Grid item xs={12}>
            <Typography variant="h5">{newsData?.title}</Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h5" style={{ fontSize: 14 }}>
              {TextHelper.formatToD_MMMM_YYYY(newsData?.datePublished)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: TextHelper.truncate({ content: newsData?.content, words: 150 }) }}
            >
            </Typography>
            <Typography>...</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr style={{ border: "5px solid rgb(249, 249, 249)", margin: 0 }} />
        </Grid>
      </Grid>
    </>
  ) : (
      <Spinner />
    );
};

LargeNewsCard.prototype = {
  data: PropTypes.object,
  imageURL: PropTypes.string,
  title: PropTypes.string,
  datePublished: PropTypes.string,
  content: PropTypes.string,
};
