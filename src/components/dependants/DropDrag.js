import React, { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid } from "@material-ui/core/";
import { OnBoardingContext, HomeContext, UserContext, TextEditorContext } from "contexts/index";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
export default function Accept(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { avatarPictureURL, setAvatarPictureURL } = useContext(
    OnBoardingContext
  );
  const { fileURL, setFileURL, setAvatarProfile, setIsUpdated, preferredIndustry,  skills, coverLetterUrl, setCoverLetterUrl } = useContext(
    UserContext
  );
  const {coverLetter} = useContext(TextEditorContext);
  const { setProgressBar } = useContext(HomeContext);


  let logo;


  if (props.data === "photo" && !props.size) {
    logo =
      avatarPictureURL === "" ? (
        <AddAPhotoIcon fontSize="large" />
      ) : (
        <img src={avatarPictureURL} alt=" avatar" />
      );
  } else if (props.data === "file" || props.data === "coverletter") {
    logo = <DescriptionIcon fontSize="large" color="secondary"/>;
  } else if (props.size === "small") {
    logo = <AddAPhotoIcon fontSize="large" />;
  }

  if(coverLetterUrl !== "" && props.data === "coverletter") {logo = <DoneOutlineIcon color="secondary" fontSize="large"/>;}
  if(fileURL !== "" && props.data === "file") {logo = <DoneOutlineIcon color="secondary" fontSize="large"/>;}


  useEffect(() => {
    if (acceptedFiles.length > 0 && props.data === "photo") {
      const uploadImageImported = async data => {
        let file = new FormData();
        file.append("imageFile", data[0]);
        const imageData = await API.uploadImage(file);
        console.log(preferredIndustry);
        let dataUserExt = {
          "avatar": imageData.response.data.data.imageFileURL.thumbnail,
          "preferredLocation": "",
          "coverLetter": coverLetter !== "" ? coverLetter : coverLetterUrl,
          "skills": skills !== [] && skills !== null ? skills : [],
          "preferredIndustry": preferredIndustry !== [] ? preferredIndustry : [],
          "resumeURL": fileURL
        };
        const profileData = await API.updateUserPreferences(dataUserExt);
        
        console.log(profileData);
        setAvatarPictureURL(
          imageData.response.data.data.imageFileURL.thumbnail
        );
        setAvatarProfile(imageData.response.data.data.imageFileURL.thumbnail);
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
        setFileURL(fileData.response.data.data.documentFileUrl.original);

        if (fileData) {
          setProgressBar(false);
        }
      };
      setIsUpdated(true);
      upLoadFile(acceptedFiles);
    }else if (acceptedFiles.length > 0 && props.data === "coverletter") {
      const upLoadFile = async data => {
        if (avatarPictureURL === "" && acceptedFiles.length > 0) {
          setProgressBar(true);
        }
        let file = new FormData();
        file.append("documentFile", data[0]);
        const fileData = await API.upLoadFile(file);
        setCoverLetterUrl(fileData.response.data.data.documentFileUrl.original);

        if (fileData) {
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
      ? { border: "none", backgroundColor: "transaprent" }
      : { border: "1px dashed #d0d0d0", backgroundColor: "white" };


  return (
    <Grid container justify="center" >
      <Grid
        container
        className="container"
        justify="center"
        spacing={2}
        item
        alignItems="center"
        xs={4}
        md={8}
        lg={8}
        {...getRootProps({ className: "dropzone" })}
        style={style}
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={4}
          md={8}
          lg={8}
        >
          {logo}
        </Grid>
        <Grid item xs={11} md={8} lg={8}>
          <input {...getInputProps()} />
        </Grid>
      </Grid>
     
    </Grid>
  );
}
