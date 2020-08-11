import React, { useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";

import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid, Avatar } from "@material-ui/core/";
import { OnBoardingContext, HomeContext, UserContext } from "contexts/index";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  avatar: {
    width: "100%",
    height: "100%",
    marginRight: "2px"
    // borderRadius: "20px",
  },
  container: {
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function Accept({ avatar, ...props }) {
  const classes = useStyles();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { avatarPictureURL, setAvatarPictureURL } = useContext(
    OnBoardingContext
  );

  const {
    fileURL,
    setFileURL,
    setAvatarProfile,
    setIsUpdated,
    coverLetterUrl,
    setCoverLetterUrl,
  } = useContext(UserContext);
  const { setProgressBar } = useContext(HomeContext);

  const getPhotoPictureUrl = useCallback((data) =>
    props.helpers.getPhotoPictureUrl(data), [props.helpers]
  );

  let logo;

  if (props.data === "photo" && !props.size) {
    logo = avatarPictureURL === "" ? null : <img src={avatarPictureURL} alt="avatar" />;
  } else if (props.data === "file" || props.data === "coverletter") {
    logo = <DescriptionIcon fontSize="large" color="secondary" />;
  } else if (props.size === "small") {
    logo = "";
  }

  if (coverLetterUrl !== "" && props.data === "coverletter") {
    logo = <DoneOutlineIcon color="secondary" fontSize="large" />;
  }
  if (fileURL !== "" && props.data === "file") {
    logo = <DoneOutlineIcon color="secondary" fontSize="large" />;
  }
  const preAvatar =
    avatar !== "" && avatar !== undefined ? (
      <Avatar src={avatar} alt="avatar" className={classes.avatar} />
    ) : logo;

  const updateProfilePicture = useCallback(async (imageData) => {
    let dataUserExt = {
      "avatar": imageData.response.data.data.imageFileURL.thumbnail
    };
    await API.updateUserPreferences(dataUserExt);
    setAvatarPictureURL(
      imageData.response.data.data.imageFileURL.thumbnail
    );
    setAvatarProfile(imageData.response.data.data.imageFileURL.thumbnail);
  }, [setAvatarPictureURL, setAvatarProfile]);

  const updateProfileResume = useCallback(async (fileData) => {
    setFileURL(fileData.response.data.data.documentFileUrl.original);

    const data = {
      resumeURL: fileData.response.data.data.documentFileUrl.original
    };
    await API.updateUserResumeAndCoverLetter(data);
    setProgressBar(false);
  }, [setProgressBar, setFileURL]);

  const updateProfileCoverletter = useCallback(async (fileData) => {
    setCoverLetterUrl(
      fileData.response.data.data.documentFileUrl.original
    );
    setProgressBar(false);
  }, [setProgressBar, setCoverLetterUrl]);

  useEffect(() => {
    console.log("Calling this useEffect")
    if (acceptedFiles.length > 0) {
      switch (props.data) {
        case "onboardingPhoto": {
          (async files => {
            let file = new FormData();
            file.append("imageFile", files[0]);
            const response = await API.uploadImage(file);
            if (response) {
              if (getPhotoPictureUrl instanceof Function)
                getPhotoPictureUrl(response?.response?.data?.data?.imageFileURL);
            }
          })(acceptedFiles);
          break;
        }
        case "photo": {
          (async files => {
            let file = new FormData();
            file.append("imageFile", files[0]);
            const imageData = await API.uploadImage(file);
            if (imageData) {
              updateProfilePicture(imageData);
            }
          })(acceptedFiles);
          break;
        }

        case "coverletter": {
          const upLoadFile = async files => {
            if (acceptedFiles.length > 0) {
              setProgressBar(true);
            }
            let file = new FormData();
            file.append("documentFile", files[0]);
            const fileData = await API.upLoadFile(file);
            if (fileData) {
              updateProfileCoverletter(fileData);
            }
          };
          setIsUpdated(true);
          upLoadFile(acceptedFiles);
          break;
        }
        default: {
          const upLoadFile = async files => {
            if (acceptedFiles.length > 0) {
              setProgressBar(true);
            }
            let file = new FormData();
            file.append("documentFile", files[0]);
            const fileData = await API.upLoadFile(file);
            if (fileData) {
              updateProfileResume(fileData);
            }
          };
          setIsUpdated(true);
          upLoadFile(acceptedFiles);
        }
      }
    }

  }, [acceptedFiles, props.data, getPhotoPictureUrl, props.uploadedAvatar, setIsUpdated, setProgressBar, updateProfileCoverletter, updateProfilePicture, updateProfileResume]);

  let style =
    props.size === "small"
      ? {
        border: "none",
        backgroundColor: "transaprent",
        outline: "none",
        padding: "2vh 2vw",
      }
      : {
        border: "1px dashed #d0d0d0",
        backgroundColor: "white",
        outline: "none",
        padding: "2vh 2vw",
      };

  return (
    <Grid container justify="center" className="container">
      <Grid
        container
        item
        xs={11}
        md={8}
        lg={8}
        {...getRootProps({ className: "dropzone" })}
        style={style}
        justify="flex-end"
      >
        <Grid container item xs={10} justify="space-around">
          <Grid item xs={9}>
            {preAvatar}
          </Grid>
          <Grid item xs={2}>
            <AddAPhotoIcon />
          </Grid>
        </Grid>

        <Grid item xs={7} md={8} lg={8}>
          <input {...getInputProps()} />
        </Grid>
      </Grid>
    </Grid>
  );
}

Accept.propTypes = {
  data: PropTypes.string.isRequired,
  helpers: PropTypes.shape({
    getPhotoPictureUrl: PropTypes.func
  })
};