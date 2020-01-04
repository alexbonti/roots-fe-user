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
import { UserContext, LoginContext, HomeContext } from "contexts";
import { Spinner, Education, Experience, AddNewExperience } from "components";
import MyDropZone from "../../../components/dependants/DropDrag";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import FallBackAvatar from "../../../helpers/img/man.svg";
import { TextEditorContext } from "contexts/index";

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

const Profile = props => {
  const { loginStatus } = useContext(LoginContext);
  const { setIsFullView } = useContext(HomeContext);
  const { coverLetter } = useContext(TextEditorContext);
  console.log(props);
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
  } = useContext(UserContext);
  const [field, setField] = useState("");
  const [data, setData] = useState("");
  const [chipValue, setChipValue] = useState();
  const [isEditSkills, setIsEditSkills] = useState(false);

  useEffect(() => {
    setIsFullView(false);
    const triggerAPI = async () => {
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
        setData(profileExtData.response);
        console.log(profileExtData);
        setPreferredIndustry(profileExtData.response.preferredIndustry);
      }
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
    <Grid
      container
      item
      xs={10}
      justify="space-evenly"
      alignItems="flex-end"
      style={{ padding: "2vh 0" }}
    >
      <Grid item>
        <TextField
          value={chipValue}
          onChange={e => setChipValue(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            if (chipValue !== "" && chipValue.length> 1) {
              console.log(chipValue);
              addChip(chipValue);
            }
          }}
          style={{ backgroundColor: "rgba(255, 129, 0, 0.21)" }}
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
        return newArray.push(data);
      } else {
        return newArray;
      }
    });

    if (Array.isArray(newArray)) {
      console.log(newArray);
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

  const ImageAvatar =
    avatarProfile === "" ||
    avatarProfile === undefined ||
    avatarProfile === "string"
      ? FallBackAvatar
      : avatarProfile;
  const content =
    userProfile !== undefined && userProfile !== null ? (
      <>
        <ThemeProvider theme={theme}>
          <Grid container style={{ overflow: "hidden" }}>
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
                    src={ImageAvatar}
                    alt="avatar"
                    style={{
                      borderRadius: "50%",
                      height: "130px",
                      width: "130px",
                    }}
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
            <Grid container style={{ padding: "2vh 1vw" }} spacing={1}>
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
          </Grid>
        </ThemeProvider>
      </>
    ) : (
      <Spinner />
    );

  return isAddMode ? <AddNewExperience data={field} /> : content;
};

export default withRouter(Profile);
