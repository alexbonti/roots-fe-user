import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core/";
import { API } from "helpers";
import { UserContext, LoginContext } from "contexts";
import { Spinner, Education, Experience, AddNewExperience } from "components";
import MyDropZone from "../../../components/dependants/DropDrag";
import AddBoxIcon from "@material-ui/icons/AddBox";

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
    isAddMode,
    setIsAddMode,
    setIsUpdated

  } = useContext(UserContext);
  const [field, setField] = useState("");

  useEffect(() => {

    const triggerAPI = async () => {
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

    setIsUpdated(false);
  }, [
    loginStatus,
    setUserLastName,
    setUserName,
    setUserEmail,
    setAvatarProfile,
    setUserProfile,
    setIsUpdated
  ]);


  const openAddMode = field => {
    setField(field);
    setIsAddMode(true);
  };

//------------EXPERIENCE--------------------------------
  const experience =
    typeof userProfile === "object" &&
    Array.isArray(userProfile.workExperience) ? (
        userProfile.workExperience.map((experience, index) => {
          return <Experience key={index} data={experience} />;
        }) ) : (<Spinner />);

//------------EDUCATION--------------------------------

  const education =
    typeof userProfile === "object" && Array.isArray(userProfile.education) ? (
      userProfile.education.map((education, index) => {
        return (
          <Education
            key={index}
            data={education}
          />
        );
      })
    ) : (
      <Spinner />
    );

  const editAvatar = (
    <Grid item xs={3} >
      <MyDropZone data={"photo"} size={"small"}/>
    </Grid>
  );

  const content =
    userProfile !== undefined && userProfile !== null ? (
      <>
        <Grid container justify="space-between" style={{ padding: "3vh" }}>
          <Grid item container justify="flex-start" alignItems="baseline" xs={5}>
            <Grid item xs={9}>
              <img src={avatarProfile} alt="avatar" style={{borderRadius: "50%"}}></img>
            </Grid>
            {editAvatar}
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
                <Typography variant="subtitle1" >{userEmail}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            container
            justify="space-between"
            xs={12}
            style={{
              backgroundColor: "rgba(8, 124, 149, 0.1)",
              height: "8vh",
              padding: "2vh",
            }}
          >
            <Grid item>
              <Typography variant="h5">Experience</Typography>
            </Grid>
            <Grid item>
              <AddBoxIcon onClick={() => openAddMode("work")} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>{experience}</Grid>
        <Grid container>
          <Grid
            item
            container
            justify="space-between"
            xs={12}
            style={{
              backgroundColor: "rgba(8, 124, 149, 0.1)",
              height: "8vh",
              padding: "2vh",
            }}
          >
            <Grid item>
              <Typography variant="h5">Education</Typography>
            </Grid>
            <Grid item>
              <AddBoxIcon onClick={() => openAddMode("education")} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>{education}</Grid>
      </>
    ) : (
      <Spinner />
    );

  return isAddMode ? <AddNewExperience data={field} /> : content;
};

export default withRouter(Profile);
