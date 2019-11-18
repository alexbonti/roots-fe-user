import React, { useState } from "react";
import "date-fns";
import { Grid, TextField, Button, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { notify, Education } from "components";
import { API } from "helpers";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

const useStyles = makeStyles(() => ({
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94np",
    backgroundColor: "#087b94 !important",
    margin: "1vh 0",
  },
}));

export const EditEducation = props => {
  const [isEditModeOn, setIsEditModeOn] = useState(true);

  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date("2017-08-18T21:11:54")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date("2019-08-18T21:11:54")
  );

  const { _id} = props.data;

  const [newSchool, SetNewSchool] = useState("");
  const [newMajor, setNewMajor] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [dataToSendToComp, setDataToSendToComp] = useState(props.data);

  const handleDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleDateChangeEnd = date => {
    setSelectedEndDate(date);
  };

  const UpdateEducation = () => {
    const callAPI = async () => {
      let data = {
        "educationId": _id,
        "school": newSchool,
        "major": newMajor,
        "startDate": selectedStartDate,
        "endDate": selectedEndDate,
        "degree": newDegree,
      };

      const eduExpData = await API.editEduExperience(data);
      notify(" Work Experience edited successfully");
      console.log("eduExpData", eduExpData.response);
      setIsEditModeOn(false);
      setDataToSendToComp(data)
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
              UpdateEducation();
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </>
  );

  return isEditModeOn ? content : <Education data={dataToSendToComp} />;
};
