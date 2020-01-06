import React, {useContext,} from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  Typography,
  Grid,
} from "@material-ui/core/";
import { HomeContext } from "contexts";
import { Spinner } from "components";
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

export const JobAppliedSmallCard = props => {
  const { setIsFullViewApplied, setJobId} = useContext(HomeContext);


 
  const openFullView = id => {
    setIsFullViewApplied(true);
    setJobId(id);
  };

  const {
    _id,
    company,
    employmentType,
    location,
    positionTitle,
    startDate,
  } = props.data.jobId;
  const { appliedDate, applicationStatus } = props.data;

  let startDateNew = startDate.substring(0, 10);

  return props.data !== undefined && props.data !== null ? (
    <>
      {" "}
      <ThemeProvider theme={theme}>
        <Grid key={_id} container alignItems="center" style={{ padding: 10 }}>
          <Grid
            onClick={() => {
              openFullView(_id);
            }}
          >
            <Grid style={{ padding: "1vh 0" }}>
              <Typography variant="h6">{positionTitle}</Typography>
              <Typography variant="subtitle2">
                {company} on {startDateNew}
              </Typography>
            </Grid>
            <Grid style={{ padding: "1vh 0" }}>
              <Typography variant="body1">
                {employmentType} / {location}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" item style={{ padding: "1vh 0" }}>
            <Grid item container justify="flex-end">
              <Grid item xs={10}>
                <Typography
                  align="right"
                  variant="subtitle1"
                  style={{ color: "rgb(157, 157, 157)" }}
                >
                  Applied on {appliedDate.substring(0, 10)}
                </Typography>
                <Typography
                  align="right"
                  variant="subtitle1"
                  style={{ color: "rgb(157, 157, 157)" }}
                >
                  Status: {applicationStatus}
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
