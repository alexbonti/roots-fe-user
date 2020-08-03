import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, makeStyles, TextField, Button, Checkbox } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment-timezone";
import { API, TextHelper } from "helpers/index";


import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { notify } from "components/common/Notification";


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

export const Certificate = props => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();

  const [title, setTitle] = useState(props.title);
  const [organisation, setOrganisation] = useState(props.organisation);
  const [credentialId, setCredentialId] = useState(props.credentialId);
  const [credentialUrl, setCredentialUrl] = useState(props.credentialUrl);
  const [issueDate, setIssueDate] = useState(props.issueDate);
  const [expiryDate, setExpiryDate] = useState(props.expiryDate);
  const [noExpiryDate, setNoExpiryDate] = useState(false);

  useEffect(() => {
    if (!props.expiryDate) setNoExpiryDate(true);
    if (props.issueDate) setIssueDate(props.issueDate);
  }, [props]);


  const updateCertificate = useCallback(() => {
    let certificateData = {
      title: title,
      organisation: organisation,
      credentialId: credentialId,
      credentialUrl: credentialUrl,
      issueDate: issueDate,
      expiryDate: expiryDate
    };
    if (noExpiryDate) certificateData.expiryDate = "";
    API.updateCretificate(props._id, certificateData, () => {
      notify("Updated");
      props.getUpdatedCertificates();
    });
  }, [credentialId, credentialUrl, expiryDate, issueDate, noExpiryDate, organisation, props, title]);

  let certificate = (<>
    <Grid container justify="center" style={{ padding: "2vh" }}>
      <Grid item container justify="space-between" xs={12}>
        <Grid item xs={11}>
          <Typography variant="h6">{TextHelper.titleCase(props.title)}</Typography>
        </Grid>
        <Grid item xs={1}>
          <EditOutlinedIcon
            onClick={() => {
              setIsEditing(true);
            }}
          />
        </Grid>

        <Grid item xs={12} container spacing={0} style={{ padding: "2vh 0" }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{TextHelper.titleCase(props.organisation)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {`Issued on ${TextHelper.formatToD_MMMM_YYYY(props.issueDate)} - 
            ${props.expiryDate === undefined || props.expiryDate === null ? "No Expiration Date" : `Expires on ${moment(props.expiryDate).format("D MMMM YYYY")}`}`}
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <Typography variant="body1" style={{ overflowWrap: "anywhere" }}>
              {props.credentialId && `Credential ID: ${props.credentialId}`}
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <Typography style={{
              textDecoration: "none",
              color: "#087B94"
            }} variant="body1" target="_blank" rel="noopener noreferrer" href={props.credentialUrl} component="a">
              See Credential
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  </>);

  let edit = (<>
    <Grid container justify="center" >
      <Grid
        item
        container
        justify="space-between"
        xs={12}
        style={{
          backgroundColor: "rgba(255, 129, 0, 0.21)",
          height: "8vh",
          padding: "2vh 4vw",
        }}
      >
        <Grid item xs={11}>
          <Typography variant="h6">Edit</Typography>
        </Grid>
        <Grid item xs={1}>
          <CancelPresentationIcon
            onClick={() => {
              setIsEditing(false);
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ padding: "2vh 4vw" }}>
        <TextField
          placeholder="Certificate title"
          fullWidth
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ padding: "2vh 4vw" }}>
        <TextField
          placeholder="Certificate Issuer"
          fullWidth
          value={organisation}
          onChange={event => {
            setOrganisation(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ padding: "2vh 4vw" }}>
        <TextField
          placeholder="Credential Id"
          fullWidth
          value={credentialId}
          onChange={event => {
            setCredentialId(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ padding: "2vh 4vw" }}>
        <TextField
          placeholder="Credential URL"
          value={credentialUrl}
          fullWidth
          onChange={event => {
            setCredentialUrl(event.target.value);
          }}
        />
      </Grid>
      <Grid
        item
        style={{ padding: "2vh 4vw" }}
        xs={12}
        container
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={2}>
          <Checkbox checked={noExpiryDate} onChange={() => {
            if (!noExpiryDate) setExpiryDate("");
            else {
              if (props.expiryDate)
                setExpiryDate(props.expiryDate);
              else setExpiryDate(Date.now());
            }
            setNoExpiryDate(!noExpiryDate);
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
        xs={12}
        container
        justify="center"
        alignItems="center"
        style={{ padding: "2vh 4vw" }}
      >
        <Grid item xs={6} style={{ padding: "0 1vw" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ width: "100%" }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              value={issueDate ? moment(issueDate).format("yyyy[-]MM[-]DD") : Date.now()}
              id="issue-date-picker-inline"
              label="Issue Date"
              onChange={(date) => {
                setIssueDate(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6} style={{ padding: "0 1vw" }}>
          {noExpiryDate ?
            <Typography>
              No Expiration Date
            </Typography>
            : <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                style={{ width: "100%" }}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                value={expiryDate ? moment(expiryDate).format("YYYY[-]MM[-]DD") : Date.now()}
                id="expiry-date-picker-inline"
                label="Expiry Date"
                onChange={(date) => {
                  setExpiryDate(date);
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
        xs={12}
        md={12}
        lg={12}
        style={{ padding: "2vh 4vw" }}
        container
        justify="space-evenly"
      >
        <Grid item xs={6} style={{ padding: "0 1vw" }}>
          <Button
            className={classes.buttonVariant}
            fullWidth
            onClick={() => {
              API.deleteCertificate(props._id, () => {
                notify("Deleted");
                props.getUpdatedCertificates();
              });
            }}
          >
            Delete
          </Button>
        </Grid>
        <Grid item xs={6} style={{ padding: "0 1vw" }}>
          <Button
            className={classes.buttons}
            fullWidth
            onClick={updateCertificate}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </>);

  return isEditing ? edit : certificate;
};

Certificate.propTypes = {
  _id: PropTypes.string.isRequired,
  getUpdatedCertificates: PropTypes.func.isRequired,
  credentialUrl: PropTypes.string.isRequired,
  issueDate: PropTypes.string.isRequired,
  organisation: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  expiryDate: PropTypes.string,
  credentialId: PropTypes.string
};
