import React, { useState, useContext } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import MyDropzone from "../DropDrag";
import { API } from "helpers";
import PropTypes from "prop-types";
import { notify } from "components";
import { Link } from "react-router-dom";
import { UserContext } from "contexts/index";

const useStyles = makeStyles(() => ({
  buttons: {
    color: "white",
    borderRadius: "25px",
    border: "1px solid #087b94np",
    backgroundColor: "#087b94 !important",
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
  textfield: {
    paddingBottom: "2vh",
  },
}));

export const EditProfile = ({ data }) => {
  const ImageAvatar =
    data.avatarProfile === "" ||
      data.avatarProfile === undefined ||
      data.avatarProfile === "string"
      ? data.FallBackAvatar
      : data.avatarProfile;

  const { setIsEditGeneralProfile, setIsUpdated } = useContext(
    UserContext
  );
  const [newFirstName, setNewFirstName] = useState(data.userName);
  const [newLastName, setNewLastName] = useState(data.userLastName);
  /**
   * Error Fields states
   * @error default is false
   */
  const [firstNameErrorField, setFirstNameErrorField] = useState(false);
  const [lastNameErrorField, setLastNameErrorField] = useState(false);

  const validationCheck = () => {
    if (newFirstName.length < 0 || newFirstName.length === 0) {
      setFirstNameErrorField(true);
      return notify("First name field can not be empty");
    } else {
      setFirstNameErrorField(false);
    }

    if (newLastName.length < 0 || newLastName.length === 0) {
      setLastNameErrorField(true);
      return notify("last name field can not be empty");
    } else {
      setLastNameErrorField(false);
    }

    const namePattern = /^[a-zA-Z]*$/;

    const firstNamePatternTest = namePattern.test(newFirstName);
    const lastNamePatternTest = namePattern.test(newLastName);

    if (!firstNamePatternTest || !lastNamePatternTest) {
      notify("First Name or Last Name must not include numbers or symbols");
      setFirstNameErrorField(true);
      setLastNameErrorField(true);
    } else {
      setFirstNameErrorField(false);
      setLastNameErrorField(false);
    }
    if (firstNamePatternTest && lastNamePatternTest) {
      return updateUser();
    }
  };



  const updateUser = async () => {
    let data = {
      first_name: newFirstName,
      last_name: newLastName,
      "firstLogin": false,
    };
    const dataProfile = await API.updateUserProfile(data);
    if (dataProfile) {
      setIsUpdated(true);
      notify("Details changed");
    }
  };
  
  const classes = useStyles();
  return (
    <>
      <Grid container justify="center">
        <Grid
          container
          justify="center"
          item
          alignItems="center"
          xs={12}
          style={{ backgroundColor: "rgba(8, 124, 149, 0.1)", height: "12vh" }}
        >
          <Grid item xs={11}>
            <Typography variant="h5">Edit Profile</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="center"
          alignItems="center"
          style={{ backgroundColor: "rgb(248, 248, 248)", height: "4vh" }}
        >
          <Grid item xs={11}>
            <Typography
              variant="body2"
              onClick={() => {
                setIsEditGeneralProfile(false);
              }}
            >
              {"< "}Back to Profile
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={11}
          style={{ height: "21vh" }}
        >
          <Grid>
            <MyDropzone data="photo" size="small" avatar={ImageAvatar} />
          </Grid>
        </Grid>
        <Grid item xs={11} style={{ marginTop: "4vh" }}>
          <TextField
            error={firstNameErrorField}
            defaultValue={data.userName}
            fullWidth
            onChange={e => {
              setNewFirstName(e.target.value);
            }}
            className={classes.textfield}
            label="First Name"
          ></TextField>
        </Grid>
        <Grid item xs={11}>
          <TextField
            error={lastNameErrorField}
            defaultValue={data.userLastName}
            className={classes.textfield}
            fullWidth
            onChange={e => {
              setNewLastName(e.target.value);
            }}
            label="Last Name"
          ></TextField>
        </Grid>
        <Grid item xs={11}>
          <Typography
            component={Link}
            to="/ResetPassword"
            color="primary"
            variant="caption"
          >
            {" "}
            Reset password
          </Typography>
        </Grid>

        <Grid item xs={11} style={{ paddingTop: "7vh" }}>
          <Button
            fullWidth
            className={classes.buttons}
            onClick={() => validationCheck()}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

EditProfile.propTypes = {
  data: PropTypes.object,
  userName: PropTypes.string,
  userLastName: PropTypes.string,
};
