import React, { useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, Button } from "@material-ui/core/";
import { HomeContext, LoginContext } from "contexts";
import ReactHtmlParser from "react-html-parser";
import { API } from "helpers";
import { notify, Spinner, CoverLetterAndResume } from "components";

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
    fontSize: "8px"
  },
  alternativeButton: {
    color: "#087b94 !important",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "white",
    fontSize: "8px"

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
  console.log(props);
  const classes = useStyles();
  const { setIsFullView, userWantsToApply, setUserWantsToApply } = useContext(
    HomeContext
  );
  const { loginStatus } = useContext(LoginContext);
  const [buttonApplyStatus, setButtonApplyStatus] = React.useState(false);

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
  } = props.data;

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
    setUserWantsToApply(true);
  };

  React.useEffect(() => {
    const callAPI = async () => {
      const dataAppliedJobs = await API.getUserAppliedJobs();
      dataAppliedJobs.response.map(job => {
        if(job.jobId._id === _id) {
          return setButtonApplyStatus(true);
        }else{
          return null;
        }
      });
    };

    callAPI();
  }, [setButtonApplyStatus, _id]);

  const buttonText = buttonApplyStatus ? "Applied" : "Apply";

  const buttonSection = props.comesFromAppiedList ? (
    ""
  ) : (
    <Grid
      container
      item
      justify="space-evenly"
    >
      <Grid item xs={4} md={2} lg={2}>
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
      <Grid item xs={4} md={2} lg={2}>
        <Button
          fullWidth
          disabled={buttonApplyStatus}
          className={classes.buttons}
          onClick={() => {
            applyJob();
          }}
        >
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );

  let content = props.hasOwnProperty("data") ? (
    <ThemeProvider theme={theme}>
      <Grid container justify="center">
        <Grid
          container
          alignItems="center"
          style={{
            padding: "3vh 1vw",
            backgroundColor: "#f8f8f8",
          }}
        >
          <Grid
            onClick={() => {
              setIsFullView(false);
            }}
            style={{fontSize: "12px",  fontFamily: "Arial Unicode MS"}}
          >
            {"<"} Back to the list
          </Grid>
        </Grid>

        <Grid
          style={{
            padding: "2vh 0",
          }}
          container
          justify="center"
          item
          xs={12}
          lg={12}
          md={12}
        >
          <Grid item xs={11} lg={8} md={8}>
            <Typography style={{fontFamily: `"Arial Rounded MT", sans-serif`, fontSize: " 21px", fontWeight: "bold"}}>{positionTitle}</Typography>
            <Typography  style={{fontFamily: `"Helvetica", sans-serif`, fontSize: " 14px"}}>{company}</Typography>
            <Typography  style={{fontFamily: `"Helvetica", sans-serif`, fontSize: " 14px"}}>
             {startDate.substring(0, 10)} 
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          lg={12}
          md={12}
          justify="center"
          style={{
            padding: "16px 0",
            backgroundColor: "rgba(8, 124, 149, 0.1)",
          }}
        >
          <Grid item xs={11} lg={8} md={8}>
            <Typography style={{fontFamily: `"SofiaProRegular","Helvetica" sans-serif`, fontSize: " 12.2px"}}>{location}</Typography>
            <Typography style={{fontFamily: `"SofiaProRegular","Helvetica" sans-serif`, fontSize: " 12.2px"}}>{industryField}</Typography>
            <Typography style={{fontFamily: `"SofiaProRegular","Helvetica" sans-serif`, fontSize: " 12.2px"}}>{employmentType}</Typography>
            <Typography style={{fontFamily: `"SofiaProRegular","Helvetica" sans-serif`, fontSize: " 12.2px"}}>Expires on {endDate.substring(0,10)}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} lg={12} md={12} justify="center" >
          <Grid item xs={11} lg={8} md={8} style={{paddingTop: "23px", paddingBottom: "57px", fontSize: "12px", fontFaily: `"Arial Unicode MS", sans-serif`}}>
            {ReactHtmlParser(description)}
          </Grid>
          {buttonSection}
        </Grid>
      </Grid>
    </ThemeProvider>
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

  const applicationForm = userWantsToApply ? (
    <CoverLetterAndResume data={_id} />
  ) : (
    content
  );

  return <>{applicationForm}</>;
};
