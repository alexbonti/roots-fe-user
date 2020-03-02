import React, { useState, useContext } from "react";
import "date-fns";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  createMuiTheme,
} from "@material-ui/core/";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextEditor, notify } from "components";
import { TextEditorContext, UserContext } from "contexts/index";

import { API } from "helpers";

const useStyles = makeStyles(() => ({
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
    height: "55px",
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

export const AddNewExperience = props => {
  const classes = useStyles();
  const { workExperience } = useContext(TextEditorContext);
  const { setIsAddMode, setIsUpdated } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date(Date.now())
  );
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    new Date(Date.now())
  );
  const [newPositionName, setNewPositionName] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newSchool, SetNewSchool] = useState("");
  const [newMajor, setNewMajor] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [refereeName, setRefereeName] = useState("");
  const [refereePhone, setRefereePhone] = useState("");

  const handleDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleChange = event => {
    setSelectedEndDate(new Date(Date.now()));
    setChecked(event.target.checked);
  };

  const handleDateChangeEnd = date => {
    console.log(date);
    setSelectedEndDate(date);
  };

  const UpdateSingleUserExp = async field => {
    if (field === "work") {
      let data = {
        "workExperience": {
          "positionTitle": newPositionName,
          "companyName": newCompanyName,
          "startDate": selectedStartDate,
          "endDate": selectedEndDate,
          "description": workExperience,
          "referee": {name:refereeName, phoneNumber: refereePhone}
        },
      };
      const workExpApiData = await API.updateWorkExp(data);
      if (workExpApiData) {
        setIsUpdated(true);
        setIsAddMode(false);
        notify("New Work Experience added succesfully");
      }
    } else if (field === "education") {
      let data = {
        "education": {
          "school": newSchool,
          "major": newMajor,
          "degree": newDegree,
          "startDate": selectedStartDate,
          "endDate": selectedEndDate,
        },
      };
      const educationExpData = await API.updateEducationExp(data);
      if (educationExpData) {
        setIsUpdated(true);
        setIsAddMode(false);
        notify("New Education Experience added succesfully");
      }
    }
  };

  const content =
    props.data === "work" ? (
      <>
        <ThemeProvider theme={theme}>
          <Grid container justify="center" style={{ overflow: "hidden" }}>
            <Grid
              item
              xs={12}
              style={{
                padding: "4vh 4vw",
                backgroundColor: "rgba(8, 124, 149, 0.1)",
              }}
            >
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "21px",
                  fontFamily: "Arial Rounded MD, sans-serif",
                }}
              >
                Work Experience
              </Typography>
            </Grid>
            <Grid
              container
              alignItems="center"
              style={{
                padding: "2vh 2vw",
                backgroundColor: "#f8f8f8",
              }}
            >
              <Grid
                onClick={() => {
                  setIsAddMode(false);
                }}
                style={{
                  fontSize: "12px",
                  fontFamily: "Arial Unicode MS, sans-serif",
                }}
              >
                {"<"} Back to Profile
              </Grid>
            </Grid>
            <Grid item xs={11} style={{ padding: "2vh 0" }}>
              <TextField
                placeholder="Position title"
                fullWidth
                onChange={event => {
                  setNewPositionName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={11} style={{ padding: "2vh 0" }}>
              <TextField
                placeholder="Company Name"
                fullWidth
                onChange={event => {
                  setNewCompanyName(event.target.value);
                }}
              />
            </Grid>
            <Grid
              item
              container
              justify="space-evenly"
              style={{ padding: "2vh 0" }}
            >
              <Grid item xs={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/yyyy"
                    margin="normal"
                    value={selectedStartDate}
                    id="date-picker-inline"
                    label="Start Date"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/yyyy"
                    margin="normal"
                    value={selectedEndDate}
                    id="date-picker-inline"
                    label="End Date"
                    onChange={handleDateChangeEnd}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container item xs={11} justify="center">
              <Grid item xs={12}>
                <Typography variant="body1">Referee</Typography>
                <Grid item xs={12} style={{ padding: "2vh 0" }}>
                  <TextField
                    placeholder="Name"
                    fullWidth
                    onChange={event => {
                       setRefereeName(event.target.value);
                     }}
                  />
                </Grid>
                <Grid xs={12} item style={{ padding: "2vh 0" }}>
                  <TextField
                    placeholder="Contact number"
                    type="tel"
                    fullWidth
                    onChange={event => {
                      setRefereePhone(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} container alignItems="center">
              <Grid xs={6}>
                <Typography className={classes.textField}>
                  Currently working here
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  value="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
            </Grid>
            <Grid item xs={11} style={{ padding: "2vh 0" }}>
              <TextEditor data={{content: "editWorkExperience"}} />
            </Grid>
            <Grid item xs={11} md={5} lg={4} style={{ padding: "4vh 0" }}>
              <Button
                className={classes.buttons}
                fullWidth
                onClick={() => {
                  UpdateSingleUserExp("work");
                }}
              >
                Add new experience
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    ) : (
      <>
        <ThemeProvider theme={theme}>
          <Grid container justify="center" style={{ padding: "2vh 0" }}>
            <Grid
              item
              xs={12}
              style={{
                padding: "4vh 4vw",
                backgroundColor: "rgba(8, 124, 149, 0.1)",
              }}
            >
              <Typography variant="h5">Education</Typography>
            </Grid>
            <Grid
              container
              alignItems="center"
              style={{
                padding: "2vh 2vw",
                backgroundColor: "#f8f8f8",
              }}
            >
              <Grid
                onClick={() => {
                  setIsAddMode(false);
                }}
              >
                {"<"} Back to Profile
              </Grid>
            </Grid>
            <Grid item xs={11} style={{ padding: "2vh 0" }}>
              <TextField
                placeholder="School"
                fullWidth
                onChange={event => {
                  SetNewSchool(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={11} style={{ padding: "2vh 0" }}>
              <TextField
                placeholder="Major"
                fullWidth
                onChange={event => {
                  setNewMajor(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={11} style={{ padding: "2vh 0" }}>
              <TextField
                placeholder="Degree"
                fullWidth
                onChange={event => {
                  setNewDegree(event.target.value);
                }}
              />
            </Grid>
            <Grid
              item
              container
              justify="space-evenly"
              style={{ padding: "2vh 0" }}
            >
              <Grid item xs={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/yyyy"
                    margin="normal"
                    value={selectedStartDate}
                    id="date-picker-inline"
                    label="Start Date"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/yyyy"
                    margin="normal"
                    value={selectedEndDate}
                    id="date-picker-inline"
                    label="End Date"
                    onChange={handleDateChangeEnd}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid item xs={11} md={5} lg={4} style={{ padding: "4vh 0" }}>
              <Button
                className={classes.buttons}
                fullWidth
                onClick={() => {
                  UpdateSingleUserExp("education");
                }}
              >
                Add new Education details
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    );

  return <>{content}</>;
};
