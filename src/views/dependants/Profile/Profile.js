import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import {
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  createMuiTheme,
} from "@material-ui/core/";
import { API } from "helpers";
import {
  UserContext,
  LoginContext,
  HomeContext,
  TextEditorContext,
} from "contexts";
import {
  Spinner,
  Education,
  Experience,
  AddNewExperience,
  EditProfile,
  GeneralProfile,
} from "components";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import FallBackAvatar from "../../../helpers/img/man.svg";

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
  typography: {
    h5: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 21,
    },
    body1: {
      fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
      fontSize: 14,
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
  },
});

const Profile = props => {
  const { loginStatus } = useContext(LoginContext);
  const { setIsFullView, setIsFullViewApplied } = useContext(HomeContext);
  const { coverLetter } = useContext(TextEditorContext);
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
    isUpdated,
    setSkills,
    skills,
    fileURL,
    coverLetterUrl,
    setPreferredIndustry,
    isEditGeneralProfile,
    setIsEditGeneralProfile,
  } = useContext(UserContext);
  const [field, setField] = useState("");
  const [data, setData] = useState("");
  const [chipValue, setChipValue] = useState("");
  const [isEditSkills, setIsEditSkills] = useState(false);

  useEffect(() => {
    setIsFullView(false);
    setIsFullViewApplied(false);
    const triggerAPI = async () => {
      setIsEditGeneralProfile(false);
      const profileResponse = await API.getUserProfile();
      if (profileResponse) {
        setUserName(profileResponse.response.first_name);
        setUserLastName(profileResponse.response.last_name);
        setUserEmail(profileResponse.response.emailId);
      }

      const profileExtData = await API.getUserProfileExt();
      if (profileExtData) {
        setUserProfile(profileExtData.response);
        setAvatarProfile(profileExtData.response.avatar);
        setSkills(profileExtData.response.skills);
        setPreferredIndustry(profileExtData.response.preferredIndustry);
        setData(profileExtData.response);
      }
      Promise.all([profileResponse, profileExtData]).then(res =>
        console.log(res)
      );
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
    isUpdated,
    setIsFullView,
    setSkills,
  ]);

  const openAddMode = field => {
    if (field === "edit skills") {
      setIsEditSkills(!editSkills);
      return null;
    }
    setField(field);
    setIsAddMode(true);
  };

  const buttonIcon = isEditSkills ? (
    <CancelPresentationIcon onClick={() => openAddMode("edit skills")} />
  ) : (
    <AddBoxIcon onClick={() => openAddMode("edit skills")} />
  );

  //------------PROFILE EDIT ----------------------------

  //------------EXPERIENCE--------------------------------
  const experience =
    typeof userProfile === "object" &&
    Array.isArray(userProfile.workExperience) ? (
        userProfile.workExperience.map((experience, index) => {
          console.log(experience);
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

  //---------------Skills--------------------------------
  const editSkills = isEditSkills ? (
    <Grid
      container
      item
      xs={11}
      justify="center"
      alignItems="baseline"
      style={{ padding: "2vh 0" }}
    >
      <Grid container item xs={11}>
        <Grid item xs={5} sm={3}>
          <TextField
            value={chipValue}
            label="Skill"
            placeholder="Add your skill here"
            onChange={e => setChipValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={5} sm={3}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => {
              if (chipValue !== "" && chipValue.length > 1) {
                addChip(chipValue);
              }
            }}
            style={{
              
              height: "100%",
              marginLeft: "20px",
              color: "white",
              borderRadius: "25px",
              boxShadow: "none"
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    ""
  );

  const deleteChip = chip => {
    let newArray = [];
    skills.map(data => {
      if (data !== chip) {
        return newArray.push(data);
      } else {
        return newArray;
      }
    });

    if (Array.isArray(newArray)) {
      API.updateUserPreferences({
        avatar: data.avatar,
        preferredLocation: userProfile.preferredLocation,
        skills: newArray,
        preferredIndustry: userProfile.preferredIndustry,
        resumeURL: fileURL,
        coverLetter: coverLetterUrl !== "" ? coverLetterUrl : coverLetter,
      });
      setSkills(newArray);
    }
  };

  const addChip = async chip => {
    if (skills === null) {
      setSkills([]);
    }

    if (Array.isArray(skills) && chip !== undefined) {
      let newSkills = skills;
      if (!newSkills.includes(chip)) {
        newSkills.push(chip);
      }

      const skillsData = await API.updateUserPreferences({
        avatar: data.avatar,
        preferredLocation: userProfile.preferredLocation,
        skills,
        preferredIndustry: userProfile.preferredIndustry,
        resumeURL: fileURL,
        coverLetter: coverLetterUrl !== "" ? coverLetterUrl : coverLetter,
      });
      if (skillsData) {
        setChipValue("");
        setSkills(newSkills);
        setIsUpdated(true);
      }
    }
  };

  const content =
    userProfile !== undefined && userProfile !== null ? (
      <>
        <ThemeProvider theme={theme}>
          <Grid container style={{ overflow: "hidden" }} justify="center">
            <GeneralProfile
              data={{
                FallBackAvatar,
                avatarProfile,
                userName,
                userLastName,
                userProfile,
                userEmail,
              }}
            />
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
                  backgroundColor: isEditSkills
                    ? "rgba(255, 129, 0, 0.21)"
                    : "rgba(8, 124, 149, 0.1)",
                  height: "8vh",
                  padding: "2vh",
                }}
              >
                <Grid item>
                  <Typography variant="h5">Skills</Typography>
                </Grid>
                <Grid item>{buttonIcon}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}container style={{ padding: "2vh 0" }} spacing={1}>
              {editSkills}
              {Array.isArray(skills)
                ? skills.map(skill => {
                  return (
                    <Grid key={Math.random()}>
                      <Chip
                        onDelete={() => deleteChip(skill)}
                        label={skill}
                        style={{
                          backgroundColor: "rgba(8, 124, 149, 0.1)",
                          color: "Black",
                          margin: "3px"
                        }}
                      />
                    </Grid>
                  );
                })
                : ""}
            </Grid>
          </Grid>
        </ThemeProvider>
      </>
    ) : (
      <Spinner />
    );

  return isAddMode ? (
    <AddNewExperience data={field} />
  ) : isEditGeneralProfile ? (
    <ThemeProvider theme={theme}>
      <EditProfile
        data={{
          FallBackAvatar,
          avatarProfile,
          userName,
          userLastName,
          userProfile,
          userEmail,
        }}
      />
    </ThemeProvider>
  ) : (
    content
  );
};

export default withRouter(Profile);
