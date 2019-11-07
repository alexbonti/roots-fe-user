import React, { useState, useContext, useEffect } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Button } from "@material-ui/core/";
import { HomeContext, LoginContext, UserContext, TextEditorContext } from "contexts";
import { API } from "helpers";
import { notify, TextEditor, EndApplication} from "components";
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
  const { setUserWantsToApply, progressBar, setProgressBar } = useContext(
    HomeContext
  );
  const {fileURL} = useContext(UserContext)
  const {coverLetter} = useContext(TextEditorContext);
  const { loginStatus } = useContext(LoginContext);
  const [hasApplied, setHasApplied] = useState(false);





  const applyJob = async () => {
    let data = {
      jobId: props.data,
    };

    let dataCVCL = {
      resumeURL: fileURL,
      coverLetter: coverLetter,
    };

    if (loginStatus) {
      const sendCVCL = await API.updateUserResumeAndCoverLetter(dataCVCL);
      console.log(sendCVCL);
      const saveJobResData = await API.userApplyJob(data);
      console.log(saveJobResData);
      notify("Congratulation your application has been sent");
    }

    //todo add error handling
    setUserWantsToApply(true);
    setHasApplied(true);
  };



  let progressBarComponent = progressBar ? <ProgressBar /> : "";

  let content = hasApplied ? <EndApplication /> : (<ThemeProvider theme={theme}>
    <Grid
      container
      alignItems="center"
      style={{ padding: "3vh 1vw", backgroundColor: "#f8f8f8" }}
    >
      <Grid
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
      <Grid item xs={11} md={8} lg={8} style={{ padding: "2vh 0" }}>
        <Typography variant="h5">
          Great, Let's apply for this job
        </Typography>
      </Grid>
    </Grid>

    <Grid container justify="center" style={{ padding: "7vh 0" }}>
      <Grid item xs={11} md={8} lg={8} style={{ padding: "2vh 0" }}>
        <Typography variant="h6">Please, write your coverletter</Typography>
      </Grid>

      <Grid item xs={11} md={8} lg={8}>
        <TextEditor data="coverletter" />
      </Grid>
    </Grid>
    <Grid container justify="center" style={{ padding: "2vh" }}>
      <Grid item xs={11} md={8} lg={8} style={{ padding: "2vh 0" }}>
        <Typography variant="subtitle1">Attach your resume</Typography>
      </Grid>
      <MyDropzone data={"file"} />
      <Grid item xs={11} md={10} lg={10} style={{ padding: "2vh 0" }}>
        {progressBarComponent}
      </Grid>
      <Grid item xs={11} md={3} lg={3} style={{ padding: "1vh 0" }}>
        <Button className={classes.buttons}fullWidth onClick={()=> {applyJob();}}>Apply</Button>
      </Grid>

    </Grid>
  </ThemeProvider>);

  return (
    <>
      {content}
    </>
  );
};
