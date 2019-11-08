import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core/";
import { API } from "helpers";
import { UserContext, LoginContext } from "contexts";

const Profile = () => {
  const { loginStatus } = useContext(LoginContext);
  const {
    setUserName,
    setUserLastName,
    setUserEmail,
    setUserProfile,
    avatarProfile,
    setAvatarProfile,
    userName,
    userLastName,
    userEmail,
    userProfile,
  } = useContext(UserContext);


  useEffect(() => {
    const triggerAPI = async () => {
      console.log("call");
      const profileResponse = await API.getUserProfile();
      setUserName(profileResponse.response.first_name);
      setUserLastName(profileResponse.response.last_name);
      setUserEmail(profileResponse.response.emailId);
      const profileExtData = await API.getUserProfileExt();
      setUserProfile(profileExtData.response);
      setAvatarProfile(profileExtData.response.avatar);
    };
    if (loginStatus) {
      triggerAPI();
    }
  }, [loginStatus]);

  console.log(userProfile)

  return (
    <>
      <Grid container justify="space-between" style={{padding: "3vh"}}>
        
        <Grid item xs={5}>
          <img src={avatarProfile} />
        </Grid>
        <Grid container item xs={5} alignItems="center">
          <Grid><Typography variant="h6">{userName}{" "}{userLastName}</Typography></Grid>
          <Grid container >
            <Grid><Typography variant="body1">{userProfile.preferredLocation}</Typography></Grid>
            <Grid><Typography variant="body1">{userEmail}</Typography></Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(Profile);
