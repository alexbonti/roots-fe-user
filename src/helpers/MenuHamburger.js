import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  hr: {
    border: "1px solid white",
    borderRadius: "1px",
    width: "75%",
    margin: "3px",
  },
  hr2: {
    border: "1px solid #FFD923",
    borderRadius: "1px",
    width: "60%",
    margin: "3px 0 0 8px",
  },
}));

export const MenuHamburger = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <hr className={classes.hr} />

      <hr className={classes.hr} />

      <hr className={classes.hr2} />
    </Grid>
  );
};
