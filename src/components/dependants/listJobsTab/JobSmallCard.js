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
    description
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
    window.scroll(0,0)
    
  }, [props]);

  let endDateNew = endDate.substring(0, 10);

  return props.data !== undefined && props.data !== null ? (
    <>
      {" "}
      <ThemeProvider theme={theme}>
        <Grid key={_id} container justify="center"alignItems="center">
          <Grid
            item
            xs={12}
            onClick={() => {
              window.scroll(0,0);
              openFullView(_id); 
            }}
          >
            <Grid style={{ padding: "1vh 0" }}>
              <Typography variant="h6">{positionTitle}</Typography>
              <Typography variant="subtitle2">
                {company} on {publishDate.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid style={{ padding: "1vh 0" }}>
              <Typography variant="body1">
                {employmentType} / {location}
              </Typography>
              {ReactHtmlParser(description.substring(0,50))} click to see more...
            </Grid>
          </Grid>
          <Grid container alignItems="center" item xs={12}style={{ padding: "1vh 0" }}>
            <FormControlLabel
              style={{ marginRight: "0" }}
              control={
                <Checkbox
                  icon={<StarBorder />}
                  checkedIcon={<StarRate />}
                  checked={savedJobs}
                  onClick={() => {
                    toogleSave(_id);
                  }}
                />
              }
            />
            <Typography align="left">{saveText}</Typography>
            <Grid item container justify="flex-end">
              <Grid item xs={10}>
                <Typography
                  align="right"
                  variant="subtitle1"
                  style={{ color: "rgb(157, 157, 157)" }}
                >
                  Expires on {endDateNew}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ height: "1vh", backgroundColor: "#F9F9F9" }}
          ></Grid>
        </Grid>
      </ThemeProvider>
    </>
  ) : (
    <Spinner />
  );
};
