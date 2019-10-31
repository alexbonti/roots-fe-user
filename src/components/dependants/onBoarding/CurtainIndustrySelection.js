import React, { useState, useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid, TextField, Chip, Typography, Button } from "@material-ui/core/";
import { OnBoardingContext } from "../../../contexts/dependants/OnBoardingContext";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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
}));

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
export const CurtainIndustrySelection = () => {
  const classes = useStyles();
  const [chipData, setChipData] = useState(jobs);
  const [accumulator, setAccumulator] = useState([]);
  const { setActiveStep, setIndustryField } = useContext(OnBoardingContext);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setIndustryField(accumulator);
    console.log(accumulator);
  };

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

    let x = accumulator.concat(newData);
    setAccumulator(x);
    setChipData(chips => {
      return chips.filter(chip => chip.key !== chipToAdd.key);
    });
  };

  let content = Array.isArray(accumulator)
    ? accumulator.map(chip => {
      return (
        <Grid key={chip.key} item>
          <Chip
            key={chip.key}
            label={chip.label}
            color="secondary"
            onDelete={handleDelete(chip)}
          />
        </Grid>
      );
    })
    : "";

  return (
    <>
      <ThemeProvider theme={theme}>
        <Autocomplete
          multiple
          options={jobs}
          getOptionLabel={option => option.label}
          style={{ width: "100%" }}
          renderInput={params => (
            <TextField {...params} placeholder="Industry Fields" fullWidth />
          )}
        />
        <Grid
          container
          spacing={1}
          style={{ padding: "3vh", backgroundColor: "white" }}
        >
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Or select it from them the list
            </Typography>
          </Grid>
          {content}
        </Grid>

        <Grid
          container
          justify="center"
          spacing={1}
          style={{ padding: "3vh", backgroundColor: "white" }}
        >
          {chipData.map(chip => {
            return (
              <Grid key={chip.key} item>
                <Chip
                  key={chip.key}
                  label={chip.label}
                  onClick={handleAdd(chip)}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={handleNext}
          >
            Next
          </Button>
        </Grid>
      </ThemeProvider>
    </>
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
