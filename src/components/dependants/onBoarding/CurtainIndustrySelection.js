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
    height: "55px"
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
  const {
    activeStep,
    setActiveStep,
    industryField,
    setIndustryField,
  } = useContext(OnBoardingContext);
  console.log(activeStep);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setIndustryField(accumulator);
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

  let content = Array.isArray(accumulator) ? (
    <Grid
      container
      spacing={1}
      style={{ minHeight: "65px", padding: "19px 0" }}
    >
      {accumulator.map(chip => {
        return (
          <Grid key={chip.label + Math.random()} item xs={4}>
            <Chip
              label={chip.label}
              color="secondary"
              onDelete={handleDelete(chip)}
              style={{ width: "28vw", margin: "1vw" }}
            />
          </Grid>
        );
      })}
    </Grid>
  ) : (
    ""
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={jobs}
          getOptionLabel={option => option.label}
          filterSelectedOptions
          renderInput={params => (
            <TextField
              {...params}
              label="Industry"
              fullWidth
            />
          )}
        />
        <Grid container>
          {content}
          <Grid item xs={11} style={{ paddingBottom: "19px " }}>
            <Typography
              style={{
                fonstSize: "16px",
                fontFamily: `"Arial", "Helvetica", sans-serif`,
                fontWeight: "bold",
              }}
              align="left"
            >
              Or select it from them the list
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify="center" spacing={1}>
          {chipData.map(chip => {
            return (
              <Grid item xs={4} key={chip.key}>
                <Chip
                  key={chip.key}
                  label={chip.label}
                  onClick={handleAdd(chip)}
                  style={{
                    width: "28vw",
                    margin: "1vw",
                    backgroundColor: "rgba(199, 66, 152,.18)",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid style={{ paddingTop: "45px" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={handleNext}
          >
            Continue
          </Button>
        </Grid>
      </ThemeProvider>
    </>
  );
};

const jobs = [
  { key: 0, label: "Accounting" },
  { key: 1, label: "Administration & Office Support" },
  { key: 2, label: "Agriculture, Horticulture, Animal & Fishing" },
  { key: 3, label: "Banking, Superannuation & Finance" },
  { key: 4, label: "Construction" },
  { key: 5, label: "Customer Service & Call Centre" },
  { key: 6, label: "Design & Architecture" },
  { key: 7, label: "Editorial, Media & Creative Arts" },
  { key: 8, label: "Education, Training & Childcare" },
  { key: 9, label: "Engineering" },
  { key: 10, label: "Executive Management & Consulting" },
  { key: 11, label: "Government, Emergency Services & Defence" },
  { key: 12, label: "Healthcare & Medical" },
  { key: 13, label: "Hospitality, Tourism & Food Services" },
  { key: 14, label: "Human Resources (HR) & Recruitment" },
  { key: 15, label: "Information Technology (IT)" },
  { key: 16, label: "Insurance" },
  { key: 17, label: "Legal" },
  { key: 18, label: "Manufacturing, Production & Operations" },
  { key: 19, label: "Marketing & Advertising" },
  { key: 20, label: "Mining & Energy" },
  { key: 21, label: "Property & Real Estate" },
  { key: 22, label: "Retail" },
  { key: 23, label: "Sales" },
  { key: 24, label: "Science, Technology & Environment" },
  { key: 25, label: "Social Work & Community Services" },
  { key: 26, label: "Trades & Services" },
  { key: 27, label: "Transport & Logistics" },
  { key: 28, label: "Work From Home & Self Employed" },
];
