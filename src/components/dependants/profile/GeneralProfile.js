import React, { useContext } from "react";
import { Typography, Grid, Avatar } from "@material-ui/core/";
import PropTypes from "prop-types";
import { UserContext } from "contexts/index";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import DescriptionIcon from "@material-ui/icons/Description";
// import MyDropzone from "../DropDrag";

export const GeneralProfile = ({ data }) => {
  const { setIsEditGeneralProfile } = useContext(UserContext);
  const {
    FallBackAvatar,
    avatarProfile,
    userName,
    //userProfile,
    userLastName,
    userEmail,
  } = data;


  //const textUploadResume = userProfile.resumeURL === "" ? "Upload your Resume" : "Your Resume";

  const ImageAvatar =
    avatarProfile === "" ||
      avatarProfile === undefined ||
      avatarProfile === "string"
      ? FallBackAvatar
      : avatarProfile;
  return (
    <Grid container spacing={2} style={{ padding: "2vh 2vw" }}>
      <Grid item container justify="flex-start" alignItems="center" spacing={1} xs={12}>
        <Grid item xs={4} md={1}>
          <Avatar src={ImageAvatar} alt="avatar" style={{
            width: "100px", height: "100px"
          }} />
        </Grid>
        <Grid item xs={7} md={10} >
          <Typography variant="h6">
            {userName} {userLastName}
          </Typography>
          <Typography variant="caption">
            {userEmail}
          </Typography>
        </Grid>
        <Grid item xs={1} md={1} style={{ height: "100%" }}>
          <EditOutlinedIcon
            onClick={() => {
              setIsEditGeneralProfile(true);
            }}
          />
        </Grid>
      </Grid>
    </Grid >
  );
};

GeneralProfile.propTypes = {
  data: PropTypes.object,
  avatarProfile: PropTypes.string,
  userName: PropTypes.string,
  userLastName: PropTypes.string,
  userProfile: PropTypes.object,
  userEmail: PropTypes.string,
};
