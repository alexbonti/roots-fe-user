import React, { useState, useContext } from "react";
import "date-fns";
import {
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { notify, Education } from "components";
import { API } from "helpers";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { UserContext } from "contexts";

const useStyles = makeStyles(() => ({
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94np",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
    height: 55,
  },
  buttonVariant: {
    color: "#087b94 ",
    borderRadius: "25px",
    border: "1px solid #087b94",
    backgroundColor: "white ",
    height: "55px",
    margin: "1vh 0",
  },
}));

export const EditEducation = props => {
  const { endDate, startDate, school, major, degree } = props.data;

  const [isEditModeOn, setIsEditModeOn] = useState(true);
  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(startDate)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(endDate));

  const { _id } = props.data;

  const [newSchool, setNewSchool] = useState(school);
  const [newMajor, setNewMajor] = useState(major);
  const [newDegree, setNewDegree] = useState(degree);
  const [dataToSendToComp, setDataToSendToComp] = useState(props.data);
  const { setIsUpdated } = useContext(UserContext);

  const handleDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleDateChangeEnd = date => {
    setSelectedEndDate(date);
  };

  const deleteEducation = async () => {
    const data = {
      "educationId": _id,
    };

    const deleteData = await API.deleteEducation(data);
    if (deleteData) {
      notify("Deleted");
      setIsEditModeOn(false);
      setIsUpdated(true);
    }
  };

  const handleDefaultValues = () => {
    if (newSchool === "") {
      return notify("School field can't be empty");
    } else if (newDegree === "") {
      return notify("Degree field can't be empty");
    } else if (newMajor === "") {
      return notify("Major field can't be empty");
    } else updateEducation();
  };

  const updateEducation = () => {
    const callAPI = async () => {
      let data = {
        "educationId": _id,
        "school": newSchool,
        "major": newMajor,
        "startDate": selectedStartDate,
        "endDate": selectedEndDate,
        "degree": newDegree,
      };

      await API.editEduExperience(data);
      notify(" Education Experience edited successfully");
      setIsEditModeOn(false);
      setDataToSendToComp(data);
    };

    callAPI();
  };

  const closeEditMode = () => {
    setIsEditModeOn(false);
  };

  //EDIT FORM
  const content = (
    <>
      <Grid container justify="center" style={{ padding: "2vh 0" }}>
        <Grid
          item
          container
          justify="space-between"
          xs={12}
          style={{
            backgroundColor: "rgba(255, 129, 0, 0.21)",
            height: "8vh",
            padding: "2vh",
          }}
        >
          <Grid item>
            <Typography variant="h6">Edit</Typography>
          </Grid>
          <Grid item>
            <CancelPresentationIcon
              onClick={() => {
                closeEditMode();
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={11} style={{ padding: "2vh 0" }}>
          <TextField
            placeholder="School"
            fullWidth
            defaultValue={props.data.school}
            onChange={event => {
              setNewSchool(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={11} style={{ padding: "2vh 0" }}>
          <TextField
            placeholder="Major"
            fullWidth
            defaultValue={props.data.major}
            onChange={event => {
              setNewMajor(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={11} style={{ padding: "2vh 0" }}>
          <TextField
            placeholder="Degree"
            fullWidth
            defaultValue={props.data.degree}
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

        <Grid
          item
          xs={11}
          md={5}
          lg={4}
          style={{ padding: "4vh 0" }}
          container
          justify="space-evenly"
        >
          <Grid item xs={5}>
            <Button
              className={classes.buttonVariant}
              fullWidth
              onClick={() => {
                deleteEducation();
              }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              className={classes.buttons}
              fullWidth
              onClick={() => {
                handleDefaultValues();
              }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  return isEditModeOn ? content : <Education data={dataToSendToComp} />;
};
