import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core/";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { EditEducation } from "components/index";
import { TextHelper } from "helpers/index";


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
        <Grid item container justify="space-between" xs={12}>
          <Grid item xs={11}>
            <Typography variant="h6">
              <span>{`${TextHelper.titleCase(degree)} • `}</span>
              <span style={{
                fontWeight: "300",
                fontSize: "smaller"
              }}>{`${TextHelper.titleCase(major)}`}</span>
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <EditOutlinedIcon
              onClick={() => {
                setIsEditModeOn(true);
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ color: "#545353" }}>
            <Typography variant="body1">
              {`${TextHelper.titleCase(school)}`}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ color: "#545353" }}>
            <Typography variant="body1">
              {`${TextHelper.formatToMMMM_YYYY(startDate)} - ${TextHelper.formatToMMMM_YYYY(endDate)}`}
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </>
  );

  return isEditModeOn ? <EditEducation data={props.data} /> : content;
};
