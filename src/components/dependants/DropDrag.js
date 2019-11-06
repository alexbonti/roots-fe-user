import React, { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid, Button} from "@material-ui/core/";
import { OnBoardingContext, HomeContext } from "contexts/index";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DescriptionIcon from '@material-ui/icons/Description';
import {ProgressBar} from '../common/ProgressBar'

export default function Accept(props) {

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const {avatarPictureURL, setAvatarPictureURL} = useContext(OnBoardingContext);
  
  const {setProgressBar} = useContext(HomeContext)

  let logo;

  if(props.data === "photo"){
    logo = avatarPictureURL === "" ? <AddAPhotoIcon fontSize="large"/> : <img src={avatarPictureURL} />;

  }
  else if(props.data === "file"){
    logo = < DescriptionIcon fontSize="large" />;
  }

  

  useEffect(() => {
    if (acceptedFiles.length > 0 && props.data === 'photo') {
      const uploadImageImported = async data => {
        let file = new FormData();
        file.append("imageFile", data[0]);
        const imageData = await API.uploadImage(file);
        setAvatarPictureURL(imageData.response.data.data.imageFileURL.thumbnail);
      };
      uploadImageImported(acceptedFiles);
    }else if(acceptedFiles.length > 0 && props.data === 'file'){
      const upLoadFile = async data => {
        let file = new FormData();
        file.append("documentFile", data[0]);
        const fileData = await API.upLoadFile(file);
        console.log(fileData);
       
      };
      upLoadFile(acceptedFiles);
    }
  }, [acceptedFiles, setAvatarPictureURL]);


  if(avatarPictureURL === "" && acceptedFiles.length > 0){
    setProgressBar(true);
    console.log("true progress bar")
  }

  return (
    <>
    <Grid
      container
      className="container"
      justify="center"
      spacing={2}
      alignItems="center"
      {...getRootProps({ className: "dropzone" })}
      style={{border: " 1px dashed #d0d0d0"}}
    >
      <Grid item  container justify="center" xs={12}>
        {logo}
      </Grid>
      <Grid item xs={8}>
        <input {...getInputProps()} />
      </Grid>
    </Grid>
    </>
  );
}
