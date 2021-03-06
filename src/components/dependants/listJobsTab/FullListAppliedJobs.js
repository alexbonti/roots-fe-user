import React, { useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core/";
import { JobAppliedSmallCard, JobFullView } from "components";
import { HomeContext } from "contexts";
import { Spinner } from "../../common/Spinner";
import PropTypes from "prop-types";



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
  const { isFullViewApplied,  jobId } = useContext(HomeContext);
  
  const findSingleJobData = id => {
    if (Array.isArray(props.data)) {
      let selectedJob = props.data.filter(jobs => jobs.jobId._id === id);
      return selectedJob[0].jobId;
    }
  };
  
  let singleJobData = isFullViewApplied ? findSingleJobData(jobId) : [];
  let introMessage =
    props.data < 1 ? (
      <Grid item xs={11}>
        <Typography variant="h6" align="center">
          No jobs applications at the moment
        </Typography>
      </Grid>
    ) : (
      ""
    );
  let listOfJobs = Array.isArray(props.data) ? (
    <>
      {introMessage}
      <Grid container style={{ backgroundColor: "white" }}>
        <Grid item xs={12}>
          {props.data.map(job => {
            return <JobAppliedSmallCard key={job._id} data={job} />;
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
  isFullViewApplied &&
    Object.prototype.hasOwnProperty.call(props, "data") &&
    singleJobData !== undefined ? (
      <JobFullView data={singleJobData} comesFromAppiedList={true} />
    ) : (
      listOfJobs
    );
  return (
    <>
      <ThemeProvider theme={theme}>{content}</ThemeProvider>
    </>
  );
};



FullListAppliedJobs.propTypes = {
  data: PropTypes.array,
};
