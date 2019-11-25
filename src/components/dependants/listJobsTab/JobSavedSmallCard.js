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

export const JobSavedSmallCard = props => {
  const { savedJobs } = props.data;
  const { setIsFullView, setJobId } = useContext(HomeContext);
  const [isSaved, setIsSaved] = useState(false);

  const openFullView = id => {
    setIsFullView(true);
    setJobId(id);
  };


  let content = Array.isArray(savedJobs) ? (

    <>
      {savedJobs.map(job => {
        const {
          publishDate,
          positionTitle,
          location,
          employmentType,
          company,
          endDate,
          _id,
        } = job;

        //taken_id = _id;
        const toogleSave = () => {
          console.log("isSaved", isSaved, "savedJobs", savedJobs, "_id", _id);
          if (isSaved) {
            API.userUnsaveJob({ "jobId": _id });
            setIsSaved(false);
          } else {
            API.userSaveJob({ "jobId": _id });
            setIsSaved(true);

          }
        };

        let endDateNew = endDate.substring(0, 10);
        return (
          <Grid key={_id} container alignItems="center" style={{ padding: 10 }}>
            <Grid
              onClick={() => {
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
                <Typography variamt="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna...
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              item
              style={{ padding: "1vh 0" }}
            >
              <FormControlLabel
                style={{ marginRight: "0" }}
                control={
                  <Checkbox
                    icon={<StarBorder />}
                    checkedIcon={<StarRate />}
                    checked={isSaved}
                    onClick={() => {
                      toogleSave();
                    }}
                  />
                }
              />
              <Typography align="left">Save</Typography>
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
        );
      })}
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



  return (
    <>
      {" "}
      <ThemeProvider theme={theme}>{content} </ThemeProvider>
    </>
  );
};
