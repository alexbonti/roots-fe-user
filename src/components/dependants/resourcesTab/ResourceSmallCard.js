import React, { useState, useContext } from "react";
import { Typography, Grid, Button } from "@material-ui/core/";
import { HomeContext } from "contexts/index";

export const ResourceSmallCard = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [button, setButton] = useState("See more");
  const { categorie, data } = props.data;
  const { setIsFullViewResource, setDataToBeSentResources } = useContext(
    HomeContext
  );

  const handleToogle = () => {
    return isOpen
      ? (setIsOpen(false), setButton("See more"))
      : (setIsOpen(true), setButton("See less"));
  };

  const styleOpen = { padding: "2vh 1vw", height: "100%" };
  const styleClosed = {
    padding: "2vh 1vw",
    height: "50vh",
    overflow: "hidden",
  };

  const styleConteiner = isOpen ? styleOpen : styleClosed;

  const openFullview = (title, content) => {
    setDataToBeSentResources({ title, content });
    setIsFullViewResource(true);
  };

  let content = data.map((tile, i) => {
    return (
      <Grid
        key={i}
        container
        justify="center"
        onClick={() => {
          openFullview(tile.title, tile.content);
        }}
      >
        <Grid
          container
          item
          xs={11}
          lg={8}
          md={11}
          style={{ padding: "2vh 0" }}
        >
          <Grid item xs={10}>
            <Typography variant="h6">{tile.title}</Typography>
          </Grid>
          <Grid item xs={10} lg={8} md={11}>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: tile.content.slice(0, 100) }}
            />
         
          </Grid>
        </Grid>
        <Grid item xs={11} lg={8} md={11}>
          <hr />
        </Grid>
      </Grid>
    );
  });

  const contentContainer = (
    <>
      <Grid
        container
        justify="center"
        style={{
          backgroundColor: "rgba(8, 124, 149, 0.1)",
        }}
      >
        <Grid item xs={11} lg={8} style={{ padding: "2vh 1vw" }}>
          <Typography variant="h6"> {categorie} </Typography>
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Grid item xs={12} style={styleConteiner}>
          {content}
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={() => {
              handleToogle();
            }}
          >
            {button}
          </Button>
        </Grid>
      </Grid>
    </>
  );

  return <>{contentContainer}</>;
};
