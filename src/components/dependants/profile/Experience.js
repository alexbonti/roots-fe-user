import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core/";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ReactHtmlParser from "react-html-parser";
import { EditExperience } from "components/index";
import { Spinner } from "components";

export const Experience = props => {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const {
    companyName,
    description,
    endDate,
    startDate,
    positionTitle,
  } = props.data;

  let newTimeS =
    typeof startDate === "object"
      ? `${startDate.getMonth() + 1} - ${startDate.getFullYear()}`
      : startDate.substring(0, 10);
  let newTimeE =
    typeof endDate === "object"
      ? `${endDate.getMonth() + 1} - ${endDate.getFullYear()}`
      : endDate.substring(0, 10);

 newTimeE =  endDate === "Currently working here" ? endDate : newTimeE;
 
  let content =
    props.data !== null && props.data !== undefined ? (
      <>
        <Grid container justify="center" style={{ padding: "2vh" }}>
          <Grid item container justify="space-between">
            <Grid item>
              <Typography variant="h6">{positionTitle}</Typography>
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
              <Typography variant="body1">{companyName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                {newTimeS} {" || "}
                {newTimeE}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {ReactHtmlParser(description)}{" "}
          </Grid>
        </Grid>
      </>
    ) : (
      <Spinner />
    );

  return isEditModeOn ? <EditExperience data={props.data} /> : content;
};
