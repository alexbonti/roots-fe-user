import React from "react";
import { Typography, Grid, Divider } from "@material-ui/core/";
import { Spinner, Image } from "components";
import { HomeContext } from "contexts";
import { TextHelper } from "helpers/index";
import PropTypes from "prop-types";



export const NewsCard = ({ data, displayDivider }) => {
  const { imageURL, title, datePublished, content } = data;

  const { setDetailsNews, setIsFullViewNews } = React.useContext(HomeContext);

  const openFullNews = () => {
    setDetailsNews(data);
    setIsFullViewNews(true);
  };

  if (data === undefined) return <Spinner />;

  let card = (<Grid item container justify="center" spacing={1} onClick={() => openFullNews()}>
    <Grid item xs={4} md={2} style={{ maxHeight: "100px", overflow: "hidden" }}>
      <Image src={imageURL} alt={title} style={{
        objectFit: "cover",

      }} />
    </Grid>
    <Grid container

      item xs={8} md={10}
    >
      <Grid item xs={12}>
        <Typography style={{ fontSize: "16px", fontWeight: "600" }}>
          {TextHelper.titleCase(title)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1"> {TextHelper.formatToD_MMMM_YYYY(datePublished)}  </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" >{TextHelper.truncate({ content: TextHelper.removeHTMLTags(content), words: 20 })}</Typography>
      </Grid>


    </Grid>
    {
      displayDivider === true &&
      <Grid item xs={12} style={{ height: "10px", }} >
        <Divider style={{
          border: "5px solid rgb(249, 249, 249)"
        }} />
      </Grid>
    }
  </Grid >);

  return card;
};

NewsCard.prototype = {
  data: PropTypes.object,
  imageURL: PropTypes.string,
  title: PropTypes.string,
  datePublished: PropTypes.string,
  content: PropTypes.string,
};
