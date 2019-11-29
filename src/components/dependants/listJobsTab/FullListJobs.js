import React, { useContext, useState } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Button, Typography, Grid, TextField } from "@material-ui/core/";
import { JobSmallCard, JobFullView, GoogleMaps } from "components";
import { HomeContext } from "contexts";
import { Spinner } from "../../common/Spinner";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReplayIcon from "@material-ui/icons/Replay";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { API } from "helpers/index";

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
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [dataAll, setDataAll] = useState([]);

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

  const searchByTitle = async string => {


    let resultArray = [];
    props.data.filter(data =>
      data._id.includes(string) ? resultArray.push(data) : ""
    );
    setDataAll(resultArray);
    setIsFilterOn(true);
    setSearchSettingTab(false);
    return resultArray;
  };

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
        <GoogleMaps data={props.data} />
      </Grid>
    </>
  ) : (
    <>
      <Grid
        container
        alignItems="flex-start"
        justify="center"
        style={{
          padding: "2vh 0vw",
          paddingBottom: "5vh",
          backgroundColor: "rgba(8, 124, 149, 0.1)",
        }}
      >
        {isFilterOn ? (
          <Grid item xs={12} align="right" onClick={() => setIsFilterOn(false)}>
            <ReplayIcon style={{ color: "rgba(0, 0, 0, 0.71)" }} />
          </Grid>
        ) : (
          ""
        )}
        <Grid
          item
          xs={11}
          lg={8} md={10}
          align="right"
          onClick={() => setSearchSettingTab(true)}
        >
          <FilterListIcon style={{ color: "rgba(0, 0, 0, 0.71)" }} />
        </Grid>
        <Grid item xs={11} lg={8} md={10}>
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
      <Grid container justify="center"style={{ backgroundColor: "white" }}>
        <Grid item xs={11} md={10} lg={8}>
          {props.data.map(job => {
            let isSaved = listSavedJobs.includes(job._id);

            return listSavedJobs !== "" ? (
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
      <JobFullView
        data={singleJobData.data}
        savedStatus={singleJobData.savedStatus}
      />
    ) : (
      listOfJobs
    );

  let filderedResult = (
    <>
      {searchTab}
      <Grid container style={{ backgroundColor: "white" }}>
        <Grid item xs={11} md={10} lg={10}>
          {dataAll.map(job => {
            let isSaved = listSavedJobs.includes(job._id);
            console.log("in");
            return listSavedJobs !== "" ? (
              <JobSmallCard key={job._id} data={job} savedStatus={isSaved} />
            ) : (
              ""
            );
          })}
        </Grid>
      </Grid>{" "}
    </>
  );

  if (isFilterOn) {
    console.log(dataAll);
    return (listOfJobs = filderedResult);
  }

  return (
    <>
      <ThemeProvider theme={theme}>{content}</ThemeProvider>
    </>
  );
};
