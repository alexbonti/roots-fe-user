import React, { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid, Button } from "@material-ui/core/";
import {
  OnBoardingContext,
  HomeContext,
  UserContext,
  TextEditorContext,
} from "contexts/index";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  avatar: {
    width: "100%",
    heigth: "100%",
    borderRadius: "20px",
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
    preferredIndustry,
    skills,
    coverLetterUrl,
    setCoverLetterUrl,
  } = useContext(UserContext);
  const { coverLetter } = useContext(TextEditorContext);
  const { setProgressBar } = useContext(HomeContext);

  let logo;

  if (props.data === "photo" && !props.size) {
    logo =
      avatarPictureURL === "" ? (
       ""
      ) : (
        <img src={avatarPictureURL} alt=" avatar" />
      );
  } else if (props.data === "file" || props.data === "coverletter") {
    logo = <DescriptionIcon fontSize="large" color="secondary" />;
  } else if (props.size === "small") {
    logo = ""
  }

  if (coverLetterUrl !== "" && props.data === "coverletter") {
    logo = <DoneOutlineIcon color="secondary" fontSize="large" />;
  }
  if (fileURL !== "" && props.data === "file") {
    logo = <DoneOutlineIcon color="secondary" fontSize="large" />;
  }
  const preAvatar =
    avatar !== "" && avatar !== undefined ? (
      <img src={avatar} alt="avatar" className={classes.avatar} />
    ) : (
      logo
    );

  useEffect(() => {
    if (acceptedFiles.length > 0 && props.data === "photo") {
      const uploadImageImported = async data => {
        let file = new FormData();
        file.append("imageFile", data[0]);
        const imageData = await API.uploadImage(file);
        if (imageData) {
          let dataUserExt = {
            "avatar": imageData.response.data.data.imageFileURL.thumbnail,
            "preferredLocation": "",
            "coverLetter": coverLetter !== "" ? coverLetter : coverLetterUrl,
            "skills": skills !== [] && skills !== null ? skills : [],
            "preferredIndustry":
              preferredIndustry !== [] ? preferredIndustry : [],
            "resumeURL": fileURL,
          };
          const profileData = await API.updateUserPreferences(dataUserExt);
          setAvatarPictureURL(
            imageData.response.data.data.imageFileURL.thumbnail
          );
          setAvatarProfile(imageData.response.data.data.imageFileURL.thumbnail);
        }
      };
      uploadImageImported(acceptedFiles);
    } else if (acceptedFiles.length > 0 && props.data === "file") {
      const upLoadFile = async data => {
        if (avatarPictureURL === "" && acceptedFiles.length > 0) {
          setProgressBar(true);
        }
        let file = new FormData();
        file.append("documentFile", data[0]);
        const fileData = await API.upLoadFile(file);
        if (fileData) {
          setFileURL(fileData.response.data.data.documentFileUrl.original);
          setProgressBar(false);
        }
      };
      setIsUpdated(true);
      upLoadFile(acceptedFiles);
    } else if (acceptedFiles.length > 0 && props.data === "coverletter") {
      const upLoadFile = async data => {
        if (avatarPictureURL === "" && acceptedFiles.length > 0) {
          setProgressBar(true);
        }
        let file = new FormData();
        file.append("documentFile", data[0]);
        const fileData = await API.upLoadFile(file);
        if (fileData) {
          setCoverLetterUrl(
            fileData.response.data.data.documentFileUrl.original
          );
          setProgressBar(false);
        }
      };
      setIsUpdated(true);
      upLoadFile(acceptedFiles);
    }
  }, [
    acceptedFiles,
    setAvatarPictureURL,
    setFileURL,
    setProgressBar,
    setIsUpdated,
  ]);

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
        <Grid container item xs={10} justify="flex-end">
          <Grid item xs={10}>
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
