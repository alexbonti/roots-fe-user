import React, { useEffect, useState, useContext } from "react";
import {
  makeStyles,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles";
import { Grid, Chip, Typography, Button, TextField } from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

const CustomAutocomplete = withStyles({
  tag: {
    backgroundColor: "#C74197",
    display: "none",
    "& .MuiChip-deleteIcon": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    color: "white",
  },
})(Autocomplete);

const SearchSettings = () => {
  const classes = useStyles();
  const { loginStatus } = useContext(LoginContext);
  const { setAvatarProfile, coverLetterUrl } = useContext(UserContext);
  const [chipData, setChipData] = useState(jobs);
  const [accumulator, setAccumulator] = useState();
  const [userExp, setUserExp] = useState();

  useEffect(() => {
    const triggerAPI = async () => {
      const profileExtData = await API.getUserProfileExt();
      if(profileExtData){
        setUserExp(profileExtData.response);
        setAvatarProfile(profileExtData.response.avatar);
        setAccumulator(profileExtData.response.preferredIndustry);
        const {preferredIndustry} = profileExtData.response;
        let values  = [];
        preferredIndustry.forEach(industry => values.push(Object.values(industry)[1]));
        let filteredSavedData = jobs.filter(job => !values.includes(job.label) );
        setChipData(filteredSavedData);

      }
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

  const handleAdd = chipToAdd => {
    let newData = chipData.filter(chip => chip.label === chipToAdd.label);
    let x = accumulator !== null ? accumulator.concat(newData) : newData;
    setAccumulator(x);
    setChipData(chips => {
      return chips.filter(chip => chip.label !== chipToAdd.label);
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
      coverLetter: coverLetter !== "" ? coverLetter : coverLetterUrl,
      preferredLocation,
      resumeUrl,
      skills,
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
        <Grid item xs={11}>
          <CustomAutocomplete
            multiple
            id="tags-standard"
            fullwidth="true"
            options={chipData}
            getOptionLabel={option => option.label}
            onChange={e => {
              handleAdd({ label: e.target.innerText });
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Industry fields"
                placeholder="Favorites"
                margin="normal"
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid
          container
          justify="center"
          spacing={1}
          style={{ padding: "3vh", backgroundColor: "white" }}
        >
          {chipData.slice(0, 10).map(chip => {
            return (
              <Grid key={Math.random()} item>
                <Chip
                  key={Math.random()}
                  label={chip.label}
                  onClick={() => handleAdd(chip)}
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
  { key: 0, label: "Accounting" },
  { key: 4, label: "Construction" },
  { key: 8, label: "Education" },
  { key: 9, label: "Engineering" },
  { key: 13, label: "Hospitality" },
  { key: 16, label: "Insurance" },
  { key: 23, label: "Sales" },
  { key: 27, label: "Transport" },
  { key: 1, label: "Administration" },
  { key: 2, label: "Agriculture" },
  { key: 3, label: "Banking" },
  { key: 5, label: "Customer Service" },
  { key: 6, label: "Design" },
  { key: 7, label: "Editorial, Media" },
  { key: 10, label: "Executive Management" },
  { key: 11, label: "Government" },
  { key: 12, label: "Healthcare" },
  { key: 14, label: "Human Resources" },
  { key: 15, label: "Information Technology (IT)" },
  { key: 17, label: "Legal" },
  { key: 18, label: "Manufacturing, Production & Operations" },
  { key: 19, label: "Marketing & Advertising" },
  { key: 20, label: "Mining & Energy" },
  { key: 21, label: "Property & Real Estate" },
  { key: 22, label: "Retail" },
  { key: 24, label: "Science, Technology & Environment" },
  { key: 25, label: "Social Work & Community Services" },
  { key: 26, label: "Trades & Services" },
  { key: 28, label: "Work From Home & Self Employed" },
];

export default withRouter(SearchSettings);
