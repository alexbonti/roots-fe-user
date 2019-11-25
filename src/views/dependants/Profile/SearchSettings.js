import React, { useEffect, useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { Grid, Chip, Typography, Button } from "@material-ui/core/";
import { LoginContext } from "contexts";
import { withRouter } from "react-router-dom";
import { API } from "../../../helpers";
import { ThemeProvider } from "@material-ui/styles";
import { UserContext } from "contexts/index";
import { notify } from "components";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    padding: 0,
    // padding: "3vh 0 0 0",
  },
  tabs: {
    height: "100%",
    boxShadow: "none",
    padding: 0,
  },

  tab: {
    height: "100%",
    alignSelf: "flex-end",
    //border: "1px solid #f0f0f0",
    borderTop: "none",
  },
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
  },
});

const SearchSettings = () => {
  const classes = useStyles();
  const { loginStatus } = useContext(LoginContext);
  const { setAvatarProfile } = useContext(UserContext);
  const [chipData, setChipData] = useState(jobs);
  const [accumulator, setAccumulator] = useState();
  const [userExp, setUserExp] = useState();

  useEffect(() => {
    const triggerAPI = async () => {
      const profileExtData = await API.getUserProfileExt();
      setUserExp(profileExtData.response);
      setAvatarProfile(profileExtData.response.avatar);
      setAccumulator(profileExtData.response.preferredIndustry);
    };
    if (loginStatus) {
      triggerAPI();
    }
  }, [loginStatus, setAvatarProfile, setAccumulator]);

  const handleDelete = chipToDelete => () => {
    let newData = accumulator.filter(chip => chip.key === chipToDelete.key);

    let x = chipData.concat(newData);
    setChipData(x);

    setAccumulator(chips => {
      return chips.filter(chip => chip.key !== chipToDelete.key);
    });
  };

  const handleAdd = chipToAdd => () => {
    let newData = chipData.filter(chip => chip.key === chipToAdd.key);
    let x = accumulator !== null ? accumulator.concat(newData) : newData;
    setAccumulator(x);
    setChipData(chips => {
      return chips.filter(chip => chip.key !== chipToAdd.key);
    });
  };

  let content = Array.isArray(accumulator)
    ? accumulator.map(chip => {
      return (
        <Chip
          key={Math.random()}
          label={chip.label}
          color="secondary"
          onDelete={handleDelete(chip)}
          style={{ margin: ".5vh 1vw" }}
        />
      );
    })
    : "";

  const saveChanges = () => {
    const {
      avatar,
      coverLetter,
      preferredLocation,
      resumeUrl,
      skills,
    } = userExp;

    const data = {
      avatar,
      coverLetter: coverLetter === null ? " " : coverLetter,
      preferredLocation: preferredLocation === null ? " " : preferredLocation,
      resumeUrl,
      skills: skills === null ? [] : skills,
      preferredIndustry: accumulator,
    };

    API.updateUserPreferences(data);
    notify("Settings Saved");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justify="center">
        <Grid
          item
          xs={12}
          style={{
            padding: "5vh 3vw",
            backgroundColor: "rgba(8, 124, 149, 0.1)",
          }}
        >
          <Typography variant="h5">Edit Search settings</Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: "3vh 3vw" }}>
          <Typography variant="h6">Your saved industry fields</Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: "3vh 1vw" }}>
          {content}
        </Grid>
        <Grid item xs={12} style={{ padding: "1vh 3vw" }}>
          <hr />
        </Grid>
        <Grid item xs={12} style={{ padding: "0vh 3vw" }}>
          <Typography variant="h6">Choose from the list below</Typography>
        </Grid>

        <Grid
          container
          justify="center"
          spacing={1}
          style={{ padding: "3vh", backgroundColor: "white" }}
        >
          {chipData.map(chip => {
            return (
              <Grid key={Math.random()} item>
                <Chip
                  key={Math.random()}
                  label={chip.label}
                  onClick={handleAdd(chip)}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={8} align="center" style={{ padding: "1vh 0" }}>
          <Button
            fullWidth
            className={classes.buttons}
            onClick={() => {
              saveChanges();
            }}
          >
            Save changes
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
const jobs = [
  { key: 0, label: "Agriculture" },
  { key: 1, label: "Natural Resources Agriculture" },
  { key: 2, label: "Food" },
  { key: 3, label: "Architecture and Construction" },
  { key: 4, label: "Arts" },
  { key: 5, label: "Audio/Video" },
  { key: 6, label: "Technology & Communications" },
  { key: 7, label: "Business Management" },
  { key: 8, label: "Administration" },
  { key: 9, label: "Education" },
  { key: 10, label: "TrainingEducation" },
  { key: 11, label: "Finance" },
  { key: 12, label: "Government" },
  { key: 13, label: "Public Administration" },
];

export default withRouter(SearchSettings);
