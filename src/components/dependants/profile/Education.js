import React, { useContext } from "react";
import { Typography, Grid } from "@material-ui/core/";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { UserContext } from "contexts/index";
import {  EditEducation} from "components/index";

export const Education = props => {
  console.log(props.data);
  const { isEditMode, setIsEditMode } = useContext(UserContext);
  const { degree, major, endDate, startDate, school } = props.data.education;

  let content = isEditMode ? (
    <EditEducation data={props.data} />
  ) : (
    <>
      <Grid container justify="center" style={{ padding: "2vh" }}>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h6">{major}</Typography>
          </Grid>
          <Grid item>
            <EditOutlinedIcon
              onClick={() => {
                setIsEditMode(true);
              }}
            />
          </Grid>
        </Grid>
        <Grid container style={{ padding: "2vh 0" }}>
          <Grid item xs={12}>
            <Typography variant="body1">{school}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {startDate.substring(0, 10)} {" || "}
              {endDate.substring(0, 10)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{degree}</Typography>
        </Grid>
      </Grid>
    </>
  );

  return content;
};
