import React, { useState, useContext } from "react";
import { Typography, Grid } from "@material-ui/core/";
import PropTypes from "prop-types";

export const GeneralProfile = props => {
  const {
    FallBackAvatar,
    avatarProfile,
    userName,
    userLastName,
    userProfile,
    userEmail,
  } = props.data;
  const ImageAvatar =
    avatarProfile === "" ||
    avatarProfile === undefined ||
    avatarProfile === "string"
      ? FallBackAvatar
      : avatarProfile;
  return (
    <Grid container justify="space-between" style={{ padding: "3vh" }}>
      <Grid item container justify="flex-start" alignItems="baseline" xs={5}>
        <Grid item xs={9}>
          <img
            src={ImageAvatar}
            alt="avatar"
            style={{
              borderRadius: "50%",
              height: "130px",
              width: "130px",
            }}
          ></img>
        </Grid>
      </Grid>
      <Grid container item xs={6} alignItems="center">
        <Grid>
          <Typography variant="h6">
            {userName} {userLastName}
          </Typography>
        </Grid>
        <Grid container justify="flex-start">
          <Grid>
            <Typography variant="subtitle1">
              {userProfile.preferredLocation}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="caption">{userEmail}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

GeneralProfile.propTypes = {
  avatarProfile: PropTypes.string,
  userName: PropTypes.string,
  userLastName: PropTypes.string,
  userProfile: PropTypes.object,
  userEmail: PropTypes.string,
};
