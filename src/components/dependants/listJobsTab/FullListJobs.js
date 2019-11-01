import React, {useContext} from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core/";
import { JobSmallCard, JobFullView } from "components";
import {HomeContext} from "contexts";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const FullListJobs = props => {

  const {isFullView, jobId} = useContext(HomeContext);


  let singleJobData;

  const findSingleJobData = (id) => {
    if(Array.isArray(props.data)){
      let selectedJob = props.data.filter(jobs =>
        jobs._id === id );
      return selectedJob;
    }
  };

  if(isFullView){
    singleJobData = findSingleJobData(jobId)
  }

  if(isFullView){
    singleJobData = findSingleJobData(jobId)
  }

  let listOfJobs = props.hasOwnProperty("data") ? (
    <>
      <Grid container style={{ padding: "5vh 2vw", backgroundColor: "rgba(8, 124, 149, 0.1)"}}>
        <Typography variant="h6">
          We found {props.data.length} opportunity
        </Typography>
      </Grid>
      <Grid container style={{ backgroundColor: "#F9F9F9" }}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            align="right"
            style={{ paddingRight: 10 }}
          >
            {" "}
            <a href="#">Sort</a>{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid container style={{ backgroundColor: "white" }}>
        <Grid item xs={12}>
          <JobSmallCard data={props} />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>{" "}
    </>
  ) : (
    "loading"
  );

  let content = isFullView ? <JobFullView data={singleJobData}/> : listOfJobs;
  return (
    <>
      <ThemeProvider theme={theme}>{content}</ThemeProvider>
    </>
  );
};
