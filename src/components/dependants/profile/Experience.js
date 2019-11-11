import React, {useContext} from "react";
import { Typography, Grid } from "@material-ui/core/";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ReactHtmlParser from "react-html-parser";
import { UserContext } from "contexts/index";
import { EditExperience } from "components/index";

export const Experience = props => {

  const {isEditMode, setIsEditMode} = useContext(UserContext);
  const {
    companyName,
    description,
    endDate,
    startDate,
    positionTitle,
  } = props.data.experience;

  

  let content = isEditMode ? <EditExperience data={props.data}/> : ( <>
    <Grid container justify="center" style={{ padding: "2vh" }}>
      <Grid item container justify="space-between">
        <Grid item>
          <Typography variant="h6">{positionTitle}</Typography>
        </Grid>
        <Grid item>
          <EditOutlinedIcon onClick={() => {setIsEditMode(true);}}/>
        </Grid>
      </Grid>
      <Grid container style={{ padding: "2vh 0" }}>
        <Grid item xs={12}>
          <Typography variant="body1">{companyName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{startDate.substring(0, 10)} {" || "}{endDate.substring(0, 10)}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {ReactHtmlParser(description)}{" "}
      </Grid>
    </Grid>
  </>);

  return content;
};
