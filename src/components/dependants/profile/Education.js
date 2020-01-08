import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core/";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { EditEducation } from "components/index";

export const Education = props => {
  const { degree, major, endDate, startDate, school } = props.data;
  const [isEditModeOn, setIsEditModeOn] = useState(false);

  let newTimeS =
    typeof startDate === "object"
      ? `${startDate.getMonth()} - ${startDate.getFullYear()}`
      : startDate.substring(0, 10);
  let newTimeE =
    typeof endDate === "object"
      ? `${endDate.getMonth()} - ${endDate.getFullYear()}`
      : endDate.substring(0, 10);

  let content = (
    <>
      <Grid container justify="center" style={{ padding: "2vh" }}>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h6">{major}</Typography>
          </Grid>
          <Grid item>
            <EditOutlinedIcon
              onClick={() => {
                setIsEditModeOn(true);
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
              {newTimeS} {" ~ "}
              {newTimeE}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{degree}</Typography>
        </Grid>
      </Grid>
    </>
  );

  return isEditModeOn ? <EditEducation data={props.data} /> : content;
};
