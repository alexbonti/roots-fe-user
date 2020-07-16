import React from "react";
import { makeStyles } from "@material-ui/core";
import { Header } from "components";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(8, 123, 148, 0.08)"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    // paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(7)
  },
  iOSPadding: {
    height: "5vh"
  },
}));

export const Layout = props => {
  const classes = useStyles();

  let content = (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>{props.children}</div>
      </main>
      <div className={classes.iOSPadding} />
    </div>
  );
  return content;
};
