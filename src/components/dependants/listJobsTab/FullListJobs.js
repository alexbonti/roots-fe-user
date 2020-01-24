import React, { useContext, useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core/";
import { JobSmallCard, JobFullView, FilterOpportunity } from "components";
import { HomeContext } from "contexts";
import { Spinner } from "../../common/Spinner";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "../../../helpers/img/search.svg";
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

export const FullListJobs = props => {
  const {
    isFullView,
    jobId,
    listSavedJobs,
    filteredData,
    setFilteredData,
    isFilterOn,
    setIsFilterOn,
  } = useContext(HomeContext);

  const [searchSettingTab, setSearchSettingTab] = useState(false);

  const newValues = [];

  const value = Array.isArray(props.searchSetting)
    ? props.searchSetting.map(industry => {
        newValues.push(industry.label);
        return newValues;
      })
    : [];

  const filteredByIndustry =
    Array.isArray(props.data) && value.length > 0
      ? props.data.filter(job => {
          return value[0].includes(job.industryField);
        })
      : props.data;

  const findSingleJobData = id => {
    if (
      Array.isArray(props.data) &&
      listSavedJobs !== "" &&
      props.data.length > 0
    ) {
      let selectedJob = props.data.filter(jobs => jobs._id === id);
      return {
        data: selectedJob[0],
        savedStatus: listSavedJobs.includes(selectedJob[0]._id),
      };
    }
  };

  let singleJobData = isFullView ? findSingleJobData(jobId) : "";

  const opportunityString =
    props.data.length > 1 ? "opportunities" : "opportunity";

  const filteredString =
    filteredData.length > 1 ? "opportunities" : "opportunity";

  const filteredByIndustryString =
    filteredByIndustry.length > 1 ? "opportunities" : "opportunity";

  const initialStringFilteredByIndustry =
    filteredByIndustry.length > 0
      ? filteredByIndustryString
      : opportunityString;

  const filteredResultString = isFilterOn
    ? filteredString
    : initialStringFilteredByIndustry;
  const filteredNumber = isFilterOn
    ? filteredData.length
    : filteredByIndustry.length;

  const resetValuesButton = isFilterOn ? (
    <Grid item xs={12} align="right" style={{ paddingRight: "2vw" }}>
      <Typography
        variant="caption"
        align="right"
        style={{ borderBottom: "1px solid black" }}
        onClick={() => {
          setIsFilterOn(false);
        }}
      >
        Reset filters
      </Typography>
    </Grid>
  ) : (
    ""
  );

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
        alignItems="center"
        justify="space-evenly"
        style={{
          height: "100px",
          backgroundColor: "rgba(8, 124, 149, 0.1)",
        }}
      >
        <Grid item xs={10} lg={8} md={10}>
          <Typography variant="h6">
            We found {filteredNumber} {filteredResultString}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          align="right"
          onClick={() => setSearchSettingTab(true)}
        >
          <img
            src={FilterListIcon}
            alt="search-icon"
            style={{ color: "rgba(0, 0, 0, 0.71)" }}
          />
        </Grid>
        {resetValuesButton}
      </Grid>
    </>
  );

  let listOfJobs = Array.isArray(props.data) ? (
    <>
      {searchTab}
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8}>
          {filteredByIndustry.map(job => {
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
    Object.prototype.hasOwnProperty.call(props, "data") &&
    singleJobData !== undefined ? (
      <JobFullView
        data={singleJobData.data}
        savedStatus={singleJobData.savedStatus}
      />
    ) : (
      listOfJobs
    );

  let filteredResults =
    filteredData !== [] ? (
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
    ) : (
      <Grid>No results</Grid>
    );

  let contentFiltered =
    isFullView &&
    Object.prototype.hasOwnProperty.call(props,"data") &&
    singleJobData !== undefined ? (
      <JobFullView
        data={singleJobData.data}
        savedStatus={singleJobData.savedStatus}
      />
    ) : (
      filteredResults
    );

  const results = isFilterOn ? contentFiltered : contentNotFiltered;

  return (
    <>
      <ThemeProvider theme={theme}>{results}</ThemeProvider>
    </>
  );
};

FullListJobs.propTypes = {
  data: PropTypes.array,
  savedJobs: PropTypes.array.isRequired,
  searchSetting: PropTypes.array,
};
