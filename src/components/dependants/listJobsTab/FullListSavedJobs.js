import React, { useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core/";
import { JobSmallCard, JobFullView } from "components";
import { HomeContext } from "contexts";
import { Spinner } from "../../common/Spinner";

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

export const FullListSavedJobs = props => {
  const { isFullView, jobId } = useContext(HomeContext);

  const findSingleJobData = id => {
    if (Array.isArray(props.data)) {
      let selectedJob = props.data.filter(job => job._id === id);
      return selectedJob[0];
    }
  };

  console.log(props, jobId);

  let singleJobData = isFullView ? findSingleJobData(jobId) : [];

  let introMessage = props.savedJobs.length < 1 ? <Grid item xs={11}><Typography variant="h6" align="center">No saved jobs at the moment</Typography></Grid> : "";
  let listOfJobs = Array.isArray(props.data) ? (
    <>
      
      <Grid container style={{ backgroundColor: "white" }} justify="center">
        {introMessage}
        <Grid item xs={11}>
          {props.data.map(job => {
            let isSaved = props.savedJobs.includes(job._id);

            return isSaved ? (
              <JobSmallCard key={job._id} data={job} savedStatus={isSaved} />
            ) : (
              ""
            );
          })}
        </Grid>
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
