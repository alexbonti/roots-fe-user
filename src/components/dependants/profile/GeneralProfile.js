import React, { useContext } from "react";
import { Typography, Grid } from "@material-ui/core/";
import PropTypes from "prop-types";
import { UserContext } from "contexts/index";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import DescriptionIcon from "@material-ui/icons/Description";
// import MyDropzone from "../DropDrag";

export const GeneralProfile = ({data}) => {
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
    <Grid container justify="space-evenly" style={{ padding: "2vh 0" }}>
      <Grid container justify="flex-end" item xs={11}>
        <Grid>
          <EditOutlinedIcon
            onClick={() => {
              setIsEditGeneralProfile(true);
            }}
          />
        </Grid>
      </Grid>
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
          <Typography variant="caption">{userEmail}</Typography>
        </Grid>

        {/* //! resume implemented  */}
        {/* <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={2}>
            <DescriptionIcon style={{ borderRadius: "5px"}}/>
          </Grid>
          <Grid item xs={1} style={{ opacity: 0, position: "fixed" }}>
            <MyDropzone data={"file"} />
          </Grid>
          <Typography variant="body2">{textUploadResume}</Typography>
        </Grid> */}
      </Grid>
    </Grid>
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
