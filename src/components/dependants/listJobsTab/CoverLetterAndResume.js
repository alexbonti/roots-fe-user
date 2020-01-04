import React, { useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Button } from "@material-ui/core/";
import {
  HomeContext,
  LoginContext,
  UserContext,
  TextEditorContext,
} from "contexts";
import { API } from "helpers";
import { notify, TextEditor, EndApplication } from "components";
import MyDropzone from "../DropDrag";
import { ProgressBar } from "../../common/ProgressBar";

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
    height: "55px"
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

export const CoverLetterAndResume = props => {
  const classes = useStyles();
  const { setUserWantsToApply, progressBar } = useContext(HomeContext);
  const { fileURL, coverLetterUrl } = useContext(UserContext);
  const { coverLetter } = useContext(TextEditorContext);
  const { loginStatus } = useContext(LoginContext);
  const [hasApplied, setHasApplied] = useState(false);

  const applyJob = async () => {
    let data = {
      jobId: props.data,
    };

    let dataCVCL = {
      resumeURL: fileURL,
      coverLetter: coverLetterUrl !== "" ? coverLetterUrl : coverLetter
    };

    if (loginStatus) {
      console.log(dataCVCL);
      const sendCVCL = await API.updateUserResumeAndCoverLetter(dataCVCL);
      console.log(sendCVCL.response);
      const saveJobResData = await API.userApplyJob(data);
      console.log(saveJobResData);
      notify("Congratulation your application has been sent");
      setUserWantsToApply(true);
      setHasApplied(true);
    }
  };

  let progressBarComponent = progressBar ? <ProgressBar /> : "";

  let content = hasApplied ? (
    <EndApplication />
  ) : (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ paddingTop: "19px", paddingBottom: "13px", backgroundColor: "#f8f8f8", fontSize: "12px", fontFamily: "Arial Unicode Ms" }}
      >
        <Grid item xs={11}
          onClick={() => {
            setUserWantsToApply(false);
          }}
        >
          {"<"} Back
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          backgroundColor: "rgba(8, 124, 149, 0.1)",
        }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={11} md={8} lg={8}>
          <Typography style={{lineHeight: "109px", fontSize: "21px", fontFamily: "Arial Rounded MT, Helvetica, sans-serif", fontWeight: "bold"}}>Great, Let's apply for this job</Typography>
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ padding: "3vh 0" }}>
        <Grid item xs={11} md={8} lg={8} style={{ padding: "2vh 0" }}>
          <Typography variant="h6">Please, write your coverletter</Typography>
        </Grid>


        <Grid item xs={11} md={8} lg={8}>
          <TextEditor data={{content: "coverletter"}} />
        </Grid>

        <Grid item xs={11} md={8} lg={8} style={{ padding: "2vh 0" }}>
          <Typography variant="h6">Or attach your documents</Typography>
        </Grid>
        <Grid item xs={11} container justify="center">
          <Grid
            item
            container
            xs={5}
            justify="center"
            alignItems="center"
            style={{ padding: "2vh 0" }}
          >
            <Grid item xs={11}>
              <Typography variant="body1" align="center">Cover Letter</Typography>{" "}
            </Grid>
            <Grid item xs={11}>
              <MyDropzone data={"coverletter"} size="small"  />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={4}
            justify="center"
            style={{ padding: "2vh 0" }}
          >
            <Grid item xs={11}>
              <Typography variant="body1" align="center">Resume</Typography>{" "}
            </Grid>
            <Grid item xs={11}>
              <MyDropzone data={"file"} size="small" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ padding: "2vh 0" }}>
        {/* <Grid item xs={11} md={8} lg={8} style={{ padding: "2vh 0" }}>
        <Typography variant="subtitle1">Attach your resume</Typography>
      </Grid> */}
        <Grid item xs={11} md={10} lg={10} style={{ padding: "2vh 0" }}>
          {progressBarComponent}
        </Grid>
        <Grid item xs={11} md={3} lg={3} style={{ padding: "1vh 0" }}>
          <Button
            className={classes.buttons}
            fullWidth
            onClick={() => {
              applyJob();
            }}
          >
            Easy apply
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

  return <>{content}</>;
};
