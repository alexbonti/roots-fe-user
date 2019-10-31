import React, { useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { API } from "helpers/index";
import { Grid, Button} from "@material-ui/core/";
import { MyCompanyContext } from "../../contexts/";
import { OnBoardingContext } from "contexts/index";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

export default function Accept() {

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const {avatarPictureURL, setAvatarPictureURL} = useContext(OnBoardingContext);

  // const acceptedFilesItems = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const uploadImageImported = async data => {
        let file = new FormData();
        file.append("imageFile", data[0]);
        const imageData = await API.uploadImage(file);
        setAvatarPictureURL(imageData.response.data.data.imageFileURL.thumbnail);
      };
      uploadImageImported(acceptedFiles);
    }
  }, [acceptedFiles, setAvatarPictureURL]);



  let logo = avatarPictureURL === "" ? <AddAPhotoIcon fontSize="large"/> : <img src={avatarPictureURL} />;


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
