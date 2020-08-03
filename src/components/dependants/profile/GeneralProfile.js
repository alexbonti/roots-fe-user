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
      <Grid container justify="flex-end" item xs={12}>
        <Grid>
          <EditOutlinedIcon
            onClick={() => {
              setIsEditGeneralProfile(true);
            }}
          />
        </Grid>
      </Grid>
      <Grid item container justify="flex-start" alignItems="center" spacing={1} xs={12}>
        <Grid item xs={4} md={1}>
          <Avatar src={ImageAvatar} alt="avatar" style={{
            width: "fit-content",
            height: "auto",
          }} />
        </Grid>
        <Grid item xs={8} md={11}>
          <Typography variant="h6">
            {userName} {userLastName}
          </Typography>
          <Typography variant="caption">
            {userEmail}
          </Typography>
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
