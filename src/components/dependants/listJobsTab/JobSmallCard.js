import React, { useState, useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";
import { StarRate, StarBorder } from "@material-ui/icons/";
import { HomeContext } from "contexts";
import { Spinner } from "components";
import { API } from "helpers";
import ReactHtmlParser from "react-html-parser";

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

export const JobSmallCard = props => {
  const { setIsFullView, setJobId, setIsUpdated } = useContext(HomeContext);
  const [savedJobs, setSavedJobs] = useState(props.savedStatus);
  const saveText = savedJobs ? "Saved" : "Save";
  
  const openFullView = id => {
    setIsFullView(true);
    setJobId(id);
  };

  const {
    _id,
    company,
    employmentType,
    endDate,
    location,
    positionTitle,
    publishDate,
    description,
  } = props.data;

  const toogleSave = _id => {
    if (savedJobs) {
      API.userUnsaveJob({ "jobId": _id });
      setSavedJobs(false);
      setIsUpdated(true);
      console.log(props, "here");
    } else {
      API.userSaveJob({ "jobId": _id });
      setSavedJobs(true);
      setIsUpdated(true);
      console.log(props);
    }
  };
  React.useEffect(() => {
    window.scroll(0, 0);
  }, [props]);

  let endDateNew = endDate.substring(0, 10);

  return props.data !== undefined && props.data !== null ? (
    <>
      {" "}
      <ThemeProvider theme={theme}>
        <Grid container justify="center" alignItems="center">
          <Grid
            item
            xs={11}
            onClick={() => {
              openFullView(_id);
            }}
            style={{maxHeight: "185px", overflow: "hidden"}}
          >
            <Grid style={{ paddingTop: "22px"}}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: `"Arial Rounded","Helvetica", sans-serif`,
                }}
              >
                {positionTitle}
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  fontFamily: `"Helvetica", sans-serif`,
                }}
              >
                {company} on {publishDate.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid style={{ paddingTop: "24px" }}>
              <Typography
                style={{
                  fontSize: "12px",
                  fontFamily: `"Arial Unicode MS", sans-serif`,
                }}
              >
                {employmentType} / {location}
              </Typography>
              <div
                style={{
                  lineHeight: "17px",
                  letterSpacing: "-0.41px",
                  fontSize: "14px",
                  fontFamily: `"Arial Unicode MS", sans-serif`,
                }}
              >
                {ReactHtmlParser(description)}
              </div>
            </Grid>
          </Grid>
          {/* <Grid item xs={11}>
            <Typography align="left" style={{fontSize: "15px", fontFamily: "Helvetica"}}>...click to see more</Typography>
          </Grid> */}
          <Grid
            container
            alignItems="center"
            item
            xs={11}
            style={{ paddingTop: "34px", paddingBottom: "22px" }}
          >
            <FormControlLabel
              style={{ marginRight: "0" }}
              control={
                <Checkbox
                  icon={<StarBorder />}
                  checkedIcon={
                    <StarRate
                      style={{
                        color: "#FFD923",
                      }}
                    />
                  }
                  checked={savedJobs}
                  onClick={() => {
                    toogleSave(_id);
                  }}
                />
              }
            />
            <Typography
              style={
                savedJobs
                  ? {
                      fontWeight: "bold",
                      fontSize: "12px",
                      fontFamily: `"Helvetica", sans-serif`,
                    }
                  : {
                      fontWeight: "400",
                      fontSize: "12px",
                      fontFamily: `"Helvetica", sans-serif`,
                    }
              }
              align="left"
            >
              {saveText}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ height: "18px", backgroundColor: "#F9F9F9" }}
          ></Grid>
        </Grid>
      </ThemeProvider>
    </>
  ) : (
    <Spinner />
  );
};
