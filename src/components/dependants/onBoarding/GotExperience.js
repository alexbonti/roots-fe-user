import React, { useState, useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Grid, TextField } from "@material-ui/core/";
import { OnBoardingContext } from "contexts/index";
import { API } from "helpers";

const useStyles = makeStyles(theme => ({
  rootMain: {
    backgroundColor: "white",
    padding: "5vh 0",
  },
  buttons: {
    color: "white",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "4vh 0",
  },
  textField: {
    marginTop: "0px",
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

export const GotExperience = () => {
  const classes = useStyles();

  const [inputPosition, setInputPosition] = useState("");
  const [positionSuggestions, setPositionSuggestions] = useState("");
  const {
    setLocation,
    setIsStart,
    setPositionTitle,
    setCompanyName,
    setStartDate,
    setEndDate,
  } = useContext(OnBoardingContext);
  const [, setLat] = useState("");
  const [, setLong] = useState("");

  const autoFill = async event => {
    setInputPosition(event.target.value);
    let suggestions = await API.getAddress(inputPosition);
    setPositionSuggestions(suggestions.suggestions);
  };

  const setSuggestions = event => {
    event.persist();
    setInputPosition(event.target.innerText);
    setLocation(event.target.innerText);
    setPositionSuggestions("");
    setIsStart(true);
  };

  const getLongLat = async input => {
    const data = await API.getLatLong(input.locationId);
    setLat(data.response.latitude);
    setLong(data.response.longitude);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justify="center">
          <Grid item xs={11}>
            <Typography
              style={{
                fonstSize: "16px",
                fontFamily: `"Arial", "Helvetica", sans-serif`,
                fontWeight: "bold",
              }}
            >
              Great! <br />
              What was your recent position?
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="standard-required"
              label="Position Title"
              placeholder="Position Title"
              margin="normal"
              onChange={event => {
                setPositionTitle(event.target.value);
              }}
            />{" "}
          </Grid>
          <Grid item xs={11}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="standard-required"
              label="Company Name"
              placeholder="Company Title"
              margin="normal"
              onChange={event => {
                setCompanyName(event.target.value);
              }}
            />{" "}
          </Grid>
          <Grid
            container
            item
            justify="space-evenly"
            xs={11}
            style={{ padding: "2vh 0" }}
          >
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Start "
                type="date"
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => {
                  setStartDate(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="End"
                type="date"
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => {
                  setEndDate(event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={11} style={{ padding: "120px 0 0 0" }}>
            <Typography
              style={{
                fonstSize: "16px",
                fontFamily: `"Arial", "Helvetica", sans-serif`,
                fontWeight: "bold",
              }}
            >
              Where are you looking to work in?
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <div>
              <TextField
                required
                id="standard-required"
                label="Location"
                value={inputPosition}
                placeholder="Employement Type"
                className={classes.textField}
                margin="normal"
                fullWidth
                onChange={event => {
                  event.preventDefault();
                  autoFill(event);
                }}
              />
              <div>
                {positionSuggestions !== null &&
                positionSuggestions !== undefined &&
                positionSuggestions !== "" ? (
                  <div className={classes.suggestion}>
                    {positionSuggestions.map(suggestion => {
                      return (
                        <div
                          key={Math.random()}
                          onClick={event => {
                            event.preventDefault();
                            setSuggestions(event);
                            getLongLat(suggestion);
                          }}
                        >
                          {suggestion.label}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div />
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
