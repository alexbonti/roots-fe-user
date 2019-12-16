import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Grid, Chip, Button } from "@material-ui/core/";
import { API } from "helpers";
import { UserContext, LoginContext, HomeContext } from "contexts";
import { Spinner, Education, Experience, AddNewExperience } from "components";
import MyDropZone from "../../../components/dependants/DropDrag";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ChipInput from "material-ui-chip-input";

const Profile = () => {
  const { loginStatus } = useContext(LoginContext);
  const { setIsFullView } = useContext(HomeContext);

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
    setIsUpdated,
    setSkills,
    skills,
  } = useContext(UserContext);
  const [field, setField] = useState("");
  const [data, setData] = useState("");
  const [chipValue, setChipValue] = useState([]);
  const [isEditSkills, setIsEditSkills] = useState(false);

  useEffect(() => {
    setIsFullView(false);
    const triggerAPI = async () => {
      const profileResponse = await API.getUserProfile();
      setUserName(profileResponse.response.first_name);
      setUserLastName(profileResponse.response.last_name);
      setUserEmail(profileResponse.response.emailId);
      const profileExtData = await API.getUserProfileExt();
      setUserProfile(profileExtData.response);
      setAvatarProfile(profileExtData.response.avatar);
      setSkills(profileExtData.response.skills);
      setData(profileExtData.response);
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
    setIsUpdated,
  ]);

  const openAddMode = field => {
    if (field === "edit skills") {
      setIsEditSkills(!editSkills);
      return null;
    }
    setField(field);
    setIsAddMode(true);
  };

  //------------EXPERIENCE--------------------------------
  const experience =
    typeof userProfile === "object" &&
    Array.isArray(userProfile.workExperience) ? (
      userProfile.workExperience.map((experience, index) => {
        return <Experience key={index} data={experience} />;
      })
    ) : (
      <Spinner />
    );

  //------------EDUCATION--------------------------------

  const education =
    typeof userProfile === "object" && Array.isArray(userProfile.education) ? (
      userProfile.education.map((education, index) => {
        return <Education key={index} data={education} />;
      })
    ) : (
      <Spinner />
    );

  const editAvatar = (
    <Grid item xs={3}>
      <MyDropZone data={"photo"} size={"small"} />
    </Grid>
  );

  //---------------Skills--------------------------------
  const editSkills = isEditSkills ? (

    <Grid container item xs={10} justify="space-evenly" alignItems="flex-end">
      <Grid item>
        <ChipInput
          label="Add your skills"
          fullWidth
          onAdd={e => {
            if (e.length > 0) {
              console.log(e);
              addChip(e);
            }
          }}
          onDelete={chip => {
            if (chip) {
              delete chip[0];
            }
          }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          fullWidth
          onClick={() => addChip(chipValue)}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  ) : (
    ""
  );
  const deleteChip = chip => {
    let newArray = [];
    skills.map(data => {
      if (data !== chip) {
        newArray.push(data);
      }
    });
    if (Array.isArray(newArray) && newArray.length > 0) {
      console.log(newArray);
      API.updateUserPreferences({
        avatar: data.avatar,
        preferredLocation: data.preferredLocation,
        skills: newArray,
        preferredIndustry: data.preferredIndustry,
        resumeURL: data.resumeURL,
        coverLetter: data.coverLetter,
      });
      setSkills(newArray);
    }
  };

  const addChip = chip => {
    console.log(chip);
    if (Array.isArray(skills) && skills.length > 0) {
      setSkills(skills.push(chip));
      API.updateUserPreferences({
        avatar: data.avatar,
        preferredLocation: data.preferredLocation,
        skills,
        preferredIndustry: data.preferredIndustry,
        resumeURL: data.resumeURL,
        coverLetter: data.coverLetter,
      });
      console.log(skills);
    }

  };
  const content =
    userProfile !== undefined && userProfile !== null ? (
      <>
        <Grid container justify="space-between" style={{ padding: "3vh" }}>
          <Grid
            item
            container
            justify="flex-start"
            alignItems="baseline"
            xs={5}
          >
            <Grid item xs={9}>
              <img
                src={avatarProfile}
                alt="avatar"
                style={{ borderRadius: "50%" }}
              ></img>
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
                <Typography variant="caption">{userEmail}</Typography>
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
              <Typography variant="h5">Skills</Typography>
            </Grid>
            <Grid item>
              <AddBoxIcon onClick={() => openAddMode("edit skills")} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          style={{ padding: "1vh 0" }}
          spacing={1}
        >
          {editSkills}
          {Array.isArray(skills)
            ? skills.map(skill => {
                return (
                  <Grid item key={Math.random()}>
                    <Chip
                      onDelete={() => deleteChip(skill)}
                      label={skill}
                      style={{
                        backgroundColor: "rgba(8, 124, 149, 0.1)",
                        color: "Black",
                      }}
                    />
                  </Grid>
                );
              })
            : ""}
        </Grid>
      </>
    ) : (
      <Spinner />
    );

  return isAddMode ? <AddNewExperience data={field} /> : content;
};

export default withRouter(Profile);
