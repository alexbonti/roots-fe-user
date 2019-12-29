import React, { useContext, useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {  Typography, Grid } from "@material-ui/core/";
import { JobSmallCard, JobFullView, FilterOpportunity } from "components";
import { HomeContext } from "contexts";
import { Spinner } from "../../common/Spinner";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReplayIcon from "@material-ui/icons/Replay";

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
  const { isFullView, jobId, listSavedJobs, filteredData, isFilterOn, setIsFilterOn } = useContext(HomeContext);
  const [searchSettingTab, setSearchSettingTab] = useState(false);


  const opportunityString = props.data.length > 1 ? "opportunities" : "opportunity";
  const filteredString = filteredData > 1 ? "opportunities" : "opportunity";

  const filteredResultString = isFilterOn ? filteredString : opportunityString;

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
        <FilterOpportunity data={props.data} />
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
            We found {props.data.length} {filteredResultString}
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  let listOfJobs = Array.isArray(props.data) ? (
    <>
      {searchTab}
      <Grid container justify="center" >
        <Grid item xs={12} md={10} lg={8} >
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

  let contentNotFiltered =
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

    
  

  

  let filderedResult =  filteredData !== [] ? (
    <>
      {searchTab}
      
      <Grid container style={{ backgroundColor: "white" }}>
        <Grid item xs={11} md={10} lg={10}>
          
          {filteredData.map(job => {
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
  ) : <Grid>No results</Grid>;


  let  contentFiltered =
    isFullView &&
    props.hasOwnProperty("data") &&
    singleJobData !== undefined ? (
      <JobFullView
        data={singleJobData.data}
        savedStatus={singleJobData.savedStatus}
      />
    ) : (
      filderedResult
    );



  const results = isFilterOn ? contentFiltered : contentNotFiltered;

  return (
    <>
      <ThemeProvider theme={theme}>{results}</ThemeProvider>
    </>
  );
};
