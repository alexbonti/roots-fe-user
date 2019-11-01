import React, { useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Button } from "@material-ui/core/";
import { HomeContext, LoginContext } from "contexts";
import ReactHtmlParser from "react-html-parser";
import { API } from "helpers";
import { notify } from "components";

const useStyles = makeStyles(theme => ({
  topper: {
    height: "10vh",
    backgroundColor: "white",
  },
  secondTopper: {
    backgroundColor: "rgb(234, 244, 246,1 )",
    height: "22vh",
  },
  title: {
    height: "10vh",
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
  },
  alternativeButton: {
    color: "#087b94 !important",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "white",
    margin: "1vh 0",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    //lightblue: "rgba(8, 124, 149, 0.1)"
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const JobFullView = props => {
  const classes = useStyles();
  const { setIsFullView } = useContext(HomeContext);
  const { loginStatus } = useContext(LoginContext);

  const {
    positionTitle,
    location,
    industryField,
    employmentType,
    description,
    company,
    startDate,
    endDate,
    _id,
  } = props.data[0];

  const saveJob = async () => {
    let data = {
      jobId: _id,
    };
    if (loginStatus) {
      const saveJobResData = await API.userSaveJob(data);
      console.log(saveJobResData);
      notify("Job Saved");
    }
  };

  const applyJob = async () => {
    let data = {
      jobId: _id,
    };
    if (loginStatus) {
      const saveJobResData = await API.userApplyJob(data);
      console.log(saveJobResData);
      notify("Congratulation your application has been sent");
    }
  };

  let content = Array.isArray(props.data) ? (
    <ThemeProvider theme={theme}>
      <Grid
        container
        alignItems="center"
        style={{ padding: "3vh 2vw", backgroundColor: "#f9f9f9" }}
      >
        <Grid
          onClick={() => {
            setIsFullView(false);
          }}
        >
          {"<"} Back to the list
        </Grid>
      </Grid>

      <Grid style={{ padding: "3vh 2vw", backgroundColor: "white" }}>
        <Typography variant="h6">{positionTitle}</Typography>
        <Typography variant="body1">{company}</Typography>
        <Typography variant="subtitle1">
          {startDate.substring(0, 10)} - {endDate.substring(0, 10)}
        </Typography>
      </Grid>

      <Grid
        style={{
          padding: "3vh 2vw",
          backgroundColor: "rgba(8, 124, 149, 0.1)",
        }}
      >
        <Typography variant="body1">{location}</Typography>
        <Typography variant="body1">{industryField}</Typography>
        <Typography variant="body1">{employmentType}</Typography>
      </Grid>
      <Grid container style={{ padding: "3vh 2vw", backgroundColor: "white" }}>
        <Grid>
          {ReactHtmlParser(description)}
        </Grid>
        <Grid
          container
          item
          justify="space-evenly"
          style={{ padding: "3vh 2vw" }}
        >
          <Grid item xs={4}>
            <Button
              fullWidth
              className={classes.alternativeButton}
              onClick={() => {
                saveJob();
              }}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              className={classes.buttons}
              onClick={() => {
                applyJob();
              }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    "loding"
  );
  return <>{content}</>;
};
