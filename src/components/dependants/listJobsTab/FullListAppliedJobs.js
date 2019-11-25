import React, { useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core/";
import { JobAppliedSmallCard, JobFullView } from "components";
import { HomeContext } from "contexts";
import { Spinner } from "../../common/Spinner";


// TODO change the full view accordingly because coming from this page

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

export const FullListAppliedJobs = props => {
  const { isFullView, jobId } = useContext(HomeContext);

  const findSingleJobData = id => {
    if (Array.isArray(props.data)) {
      let selectedJob = props.data.filter(jobs => jobs.jobId._id === id);
      console.log(selectedJob);
      return selectedJob[0].jobId;
    }
  };

  let singleJobData = isFullView ? findSingleJobData(jobId) : [];
  let listOfJobs = Array.isArray(props.data) ? (
    <>
      <Grid container style={{ backgroundColor: "#F9F9F9" }}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            align="right"
            style={{ paddingRight: 10 }}
          >
            {" "}
            <a href="http://toseomewher.com">Sort</a>{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid container style={{ backgroundColor: "white" }}>
        <Grid item xs={12}>
          {props.data.map(job => {
            return <JobAppliedSmallCard key={job._id} data={job} />;
          })}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>{" "}
    </>
  ) : (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: "60vh" }}
    >
      <Grid item>
        <Spinner />
      </Grid>
    </Grid>
  );

  console.log(isFullView,
    props.hasOwnProperty("data"),
    singleJobData)
  let content =
    isFullView &&
    props.hasOwnProperty("data") &&
    singleJobData !== undefined ? (
      <JobFullView data={singleJobData} />
    ) : (
      listOfJobs
    );
  return (
    <>
      <ThemeProvider theme={theme}>{content}</ThemeProvider>
    </>
  );
};
