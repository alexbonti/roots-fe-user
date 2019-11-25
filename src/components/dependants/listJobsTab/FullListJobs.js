import React, { useContext, useState } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Button, Typography, Grid, TextField } from "@material-ui/core/";
import { JobSmallCard, JobFullView } from "components";
import { HomeContext } from "contexts";
import { Spinner } from "../../common/Spinner";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import { classes } from "istanbul-lib-coverage";

const useStyles = makeStyles(theme => ({
  rootMain: {
    backgroundColor: "white",
    padding: "5vh 0",
  },
  buttons: {
    color: "white",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
    borderRadius: "25px",
    padding: "2vh 3vw",
  },
}));

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
  const classes = useStyles();
  const { isFullView, jobId, listSavedJobs } = useContext(HomeContext);
  const [searchSettingTab, setSearchSettingTab] = useState(false);

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

  let searchTab = searchSettingTab ? (
    <>
      <Grid
        container
        justify="center"
        style={{ backgroundColor: "rgba(8, 124, 149, 0.1)", padding: "1vh 0" }}
      >
        <Grid item xs={11} align="right">
          <CloseIcon onClick={() => setSearchSettingTab(false)} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            //className={classes.textField}
            fullWidth
            id="standard"
            label="Keyword"
            placeholder="keyword"
            margin="normal"
            // onChange={event => {
            //   setPositionTitle(event.target.value);
            //}}
          />{" "}
        </Grid>
        <Grid item xs={10}>
          <TextField
            //className={classes.textField}
            fullWidth
            id="standard"
            label="Location"
            placeholder="Location"
            margin="normal"
            // onChange={event => {
            //   setPositionTitle(event.target.value);
            //}}
          />{" "}
        </Grid>
        <Grid item xs={10}>
          <TextField
            //className={classes.textField}
            fullWidth
            id="standard"
            label="Position type"
            placeholder="Position type"
            margin="normal"
            // onChange={event => {
            //   setPositionTitle(event.target.value);
            //}}
          />{" "}
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth className={classes.buttons}>
            Search
          </Button>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
      <Grid
        container
        alignItems="flex-start"
        style={{
          padding: "2vh 2vw",
          paddingBottom: "5vh",
          backgroundColor: "rgba(8, 124, 149, 0.1)",
        }}
      >
        <Grid container item >
          <Grid item xs={11}>
            <Typography
              align="right"
              variant="body1"
              onClick={() => setSearchSettingTab(true)}
            >
              Filter
            </Typography>
          </Grid>
          <Grid item xs={1} align="center">
            <SettingsIcon style={{ color: "rgba(0, 0, 0, 0.71)" }} />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            We found {props.data.length} opportunity
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  let listOfJobs = Array.isArray(props.data) ? (
    <>
      {searchTab}
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
