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

export const FullListJobs = props => {
  const { isFullView, jobId, listSavedJobs } = useContext(HomeContext);
  console.log(props);

  const findSingleJobData = id => {
    if (Array.isArray(props.data) && listSavedJobs !== "") {
      let selectedJob = props.data.filter(jobs => jobs._id === id);
      return {
        data: selectedJob[0],
        savedStatus: listSavedJobs.includes(selectedJob[0]._id),
      };
    }
  };

  let singleJobData = isFullView ? findSingleJobData(jobId) : "";

  let listOfJobs = Array.isArray(props.data) ? (
    <>
      <Grid
        container
        style={{
          padding: "5vh 2vw",
          backgroundColor: "rgba(8, 124, 149, 0.1)",
        }}
      >
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
            <a href="http://toseomewher.com">Sort</a>{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid container style={{ backgroundColor: "white" }}>
        <Grid item xs={12}>
          {props.data.map(job => {
            let isSaved = listSavedJobs.includes(job._id);

            return listSavedJobs !== "" ? (
              <JobSmallCard key={job._id} data={job} savedStatus={isSaved} />
            ) : (
              ""
            );
          })}
          );
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

  let content =
    isFullView &&
    props.hasOwnProperty("data") &&
    singleJobData !== undefined ? (
      <JobFullView
        data={singleJobData.data}
        savedStatus={singleJobData.savedStatus}
      />
    ) : (
      listOfJobs
    );
  return (
    <>
      <ThemeProvider theme={theme}>{content}</ThemeProvider>
    </>
  );
};
