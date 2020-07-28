import React, { useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

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


const AddNewExperienceHeader = (props) => {

  let header = (<>
    <Grid item xs={12} style={{ padding: "4vh 4vw", backgroundColor: "rgba(8, 124, 149, 0.1)", }} >
      <Typography style={{
        fontWeight: "bold",
        fontSize: "21px",
        fontFamily: "Arial Rounded MD, sans-serif",
      }}>{props.title}</Typography>
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
          props.setIsAddMode(false);
        }}
        style={{
          fontSize: "12px",
          fontFamily: "Arial Unicode MS, sans-serif",
        }}
      >
        {"<"} Back to Profile
      </Grid>
    </Grid>
  </>);
  return header;
};

AddNewExperienceHeader.propTypes = {
  title: PropTypes.string.isRequired,
  setIsAddMode: PropTypes.func.isRequired
};

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

  const [certificateTitle, setCertificateTitle] = useState("");
  const [certificateOrganisation, setCertificateOrganisation] = useState("");
  const [certificateCredentialId, setCertificateCredentialId] = useState("");
  const [certificateCredentialUrl, setCertificateCredentialUrl] = useState("");
  const [certificateIssueDate, setCertificateIssueDate] = useState(Date.now());
  const [certificateExpiryDate, setCertificateExpiryDate] = useState();
  const [certificateNoExpiryDate, setCertificateNoExpiryDate] = useState(false);

  const handleDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleChange = event => {
    setSelectedEndDate(new Date(Date.now()));
    setChecked(event.target.checked);
  };

  const handleDateChangeEnd = date => {
    setSelectedEndDate(date);
  };

  const addCertificate = useCallback(() => {
    let certificateData = {
      title: certificateTitle,
      organisation: certificateOrganisation,
      credentialId: certificateCredentialId,
      credentialUrl: certificateCredentialUrl,
      issueDate: certificateIssueDate,
    };
    if (!certificateNoExpiryDate) certificateData.expiryDate = certificateExpiryDate;
    API.createCretificate(certificateData, () => {
      notify("New Certificate added succesfully");
      setIsAddMode(false);
      setIsUpdated(true);
    });
  }, [certificateCredentialId, certificateCredentialUrl, certificateExpiryDate, certificateIssueDate, certificateNoExpiryDate, certificateOrganisation, props, certificateTitle]);

  const UpdateSingleUserExp = async field => {
    if (field === "work") {
      let data = {
        "workExperience": {
          "positionTitle": newPositionName,
          "companyName": newCompanyName,
          "startDate": selectedStartDate,
          "endDate": selectedEndDate,
          "description": workExperience,
          "referee": { name: refereeName, phoneNumber: refereePhone }
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

  const work = (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justify="center" style={{ overflow: "hidden" }}>
          <AddNewExperienceHeader setIsAddMode={setIsAddMode} title="Work Experience" />
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
                  id="start-date-inline"
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
                  id="end-date-inline"
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
            <Grid item xs={6}>
              <Typography className={classes.textField}>
                Currently working here
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                value="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={11} style={{ padding: "2vh 0" }}>
            <TextEditor data={{ content: "editWorkExperience" }} />
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
  );
  let education = <>
    <ThemeProvider theme={theme}>
      <Grid container justify="center" style={{ overflow: "hidden" }}>
        <AddNewExperienceHeader setIsAddMode={setIsAddMode} title="Education" />
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
  </>;


  let certificate = (<ThemeProvider theme={theme}>
    <Grid container justify="center" style={{ overflow: "hidden" }}>
      <AddNewExperienceHeader setIsAddMode={setIsAddMode} title="Certificates" />
      <Grid item xs={11} style={{ padding: "2vh 0" }}>
        <TextField
          placeholder="Certificate title"
          fullWidth
          required
          value={certificateTitle}
          onChange={event => {
            setCertificateTitle(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={11} style={{ padding: "2vh 0" }}>
        <TextField
          placeholder="Certificate Issuer"
          fullWidth
          required
          value={certificateOrganisation}
          onChange={event => {
            setCertificateOrganisation(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={11} style={{ padding: "2vh 0" }}>
        <TextField
          placeholder="Credential Id"
          fullWidth

          value={certificateCredentialId}
          onChange={event => {
            setCertificateCredentialId(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={11} style={{ padding: "2vh 0" }}>
        <TextField
          placeholder="Credential URL"
          value={certificateCredentialUrl}
          fullWidth
          onChange={event => {
            setCertificateCredentialUrl(event.target.value);
          }}
        />
      </Grid>
      <Grid
        item
        xs={11}
        container
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2}>
          <Checkbox checked={certificateNoExpiryDate} onChange={() => {
            if (!certificateNoExpiryDate) setCertificateExpiryDate("");
            else
              setCertificateExpiryDate(Date.now());
            setCertificateNoExpiryDate(!certificateNoExpiryDate);
          }} />
        </Grid>
        <Grid item xs={10}>
          <Typography>
            This credential does not expire
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justify="space-evenly"
        alignItems="center"
        style={{ padding: "2vh 0" }}
      >
        <Grid item xs={5}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              required
              value={certificateIssueDate ? moment(certificateIssueDate).format("yyyy[-]MM[-]DD") : Date.now()}
              id="issuedate-picker-inline"
              label="Issue Date"
              onChange={(date) => {
                setCertificateIssueDate(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={5}>
          {certificateNoExpiryDate ?
            <Typography>
              No Expiration Date
            </Typography>
            : <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                value={certificateExpiryDate ? moment(certificateExpiryDate).format("YYYY[-]MM[-]DD") : Date.now()}
                id="expirydate-picker-inline"
                label="Expiry Date"
                onChange={(date) => {
                  setCertificateExpiryDate(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>}
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
        <Button
          className={classes.buttons}
          fullWidth
          onClick={addCertificate}
        >Add New Certificate</Button>
      </Grid>
    </Grid>
  </ThemeProvider>
  );

  const contentToRender = (type) => {
    switch (type) {
      case "work": return work;
      case "education": return education;
      case "certificates": return certificate;
      default: return null;
    }
  };
  return contentToRender(props.data);
};
