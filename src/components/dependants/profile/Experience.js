import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core/";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ReactHtmlParser from "react-html-parser";
import { EditExperience } from "components/index";
import { Spinner } from "components";
import { TextHelper } from "helpers/index";

export const Experience = props => {
  const [isEditModeOn, setIsEditModeOn] = useState(false);

  const {
    companyName,
    description,
    endDate,
    startDate,
    positionTitle,
    referee,
  } = props.data;

  let newTimeS =
    typeof startDate === "object"
      ? `${startDate.getMonth() + 1} - ${startDate.getFullYear()}`
      : startDate.substring(0, 10);
  let newTimeE =
    typeof endDate === "object"
      ? `${endDate.getMonth() + 1} - ${endDate.getFullYear()}`
      : endDate.substring(0, 10);

  newTimeE = endDate === "Currently working here" ? endDate : newTimeE;

  if (companyName === undefined || positionTitle === undefined || referee === undefined || description === undefined)
    return <Spinner />;

  let content =
    props.data !== null && props.data !== undefined ? (
      <>
        <Grid container justify="center" style={{ padding: "2vh" }}>
          <Grid item container justify="space-between">
            <Grid item xs={11} style={{ color: "#545353" }}>
              <Typography variant="h6">
                <span>{`${TextHelper.titleCase(positionTitle)} • `}</span>
                <span style={{
                  fontWeight: "300",
                  fontSize: "smaller"
                }}>{`${TextHelper.titleCase(companyName)}`}</span>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <EditOutlinedIcon
                onClick={() => {
                  setIsEditModeOn(true);
                }}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} style={{ padding: "2vh 0" }}>

            <Grid item xs={12} style={{ color: "#545353" }}>
              <Typography variant="body1">
                {`${TextHelper.formatToD_MMMM_YYYY(startDate)} - 
                      ${endDate === undefined || endDate === null ? "Present" : `${TextHelper.formatToD_MMMM_YYYY(endDate)}`}`
                }
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ color: "#545353" }}>
            <Typography variant="body1">
              {ReactHtmlParser(description)}
            </Typography>
          </Grid>
          {referee !== undefined ? (<>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: "#545353", fontWeigth: "600" }}>
                Refrees
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ color: "#545353" }}>
              <Typography variant="body1">
                <span style={{
                  fontWeight: "400"
                }}>{`${TextHelper.titleCase(referee.name)} •`}</span><span style={{
                  fontWeight: "300"
                }}> {`${referee.phoneNumber}`}</span>
              </Typography>
            </Grid>

          </>
          ) : null}
        </Grid>
      </>
    ) : <Spinner />;

  return isEditModeOn ? <EditExperience data={props.data} /> : content;
};
