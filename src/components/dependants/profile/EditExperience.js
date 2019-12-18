import React, { useState, useContext } from "react";
import "date-fns";
import { Grid, TextField, Button, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextEditor, notify, Experience } from "components";
import { TextEditorContext } from "contexts/index";
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

export const EditExperience = props => {
  const [isEditModeOn, setIsEditModeOn] = useState(true);

  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date("2017-08-18T21:11:54")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date("2019-08-18T21:11:54")
  );
  const { workExperience } = useContext(TextEditorContext);

  const { companyName, positionTitle, description, _id } = props.data;

  const [newPositionName, setNewPositionName] = useState(positionTitle);
  const [newCompanyName, setNewCompanyName] = useState(companyName);
  const [dataToSendToComp, setDataToSendToComp] = useState(props.data);

  const handleDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleDateChangeEnd = date => {
    setSelectedEndDate(date);
  };

  const UpdateSingleUserWorkExp = () => {
    console.log("description", description,"workExperience", workExperience );
    const callAPI = async () => {
      let data;
      if (workExperience === "") {
        data = {
          "workExperienceId": _id,
          "positionTitle": newPositionName,
          "companyName": newCompanyName,
          "startDate": selectedStartDate,
          "endDate": selectedEndDate,
          "description": description,
        };
      } else {
        data = {
          "workExperienceId": _id,
          "positionTitle": newPositionName,
          "companyName": newCompanyName,
          "startDate": selectedStartDate,
          "endDate": selectedEndDate,
          "description": workExperience,
        };
      }

      setDataToSendToComp({
        companyName: newCompanyName,
        description: workExperience,
        endDate: selectedEndDate,
        startDate: selectedStartDate,
        positionTitle: newPositionName,
      });

      const workExpApiData = await API.editWorkExperience(data);
      notify(" Work Experience edited successfully");
      console.log("workExpApiData", workExpApiData.response);
      setIsEditModeOn(false);
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
            label="Position Title"
            defaultValue={positionTitle}
            fullWidth
            onChange={event => {
              setNewPositionName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={11} style={{ padding: "2vh 0" }}>
          <TextField
            label="Company Name"
            defaultValue={companyName}
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
        <Grid item xs={11}>
          <TextEditor
            data={{ content: "editWorkExperience", defaultValue: description }}
          />
        </Grid>
        <Grid item xs={11} style={{ padding: "2vh 0" }}>
          <Button
            className={classes.buttons}
            fullWidth
            onClick={() => {
              UpdateSingleUserWorkExp();
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </>
  );

  return isEditModeOn ? content : <Experience data={dataToSendToComp} />;
};
