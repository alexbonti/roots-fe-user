import React, { useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core/";
import { StarRate, StarBorder, Star } from "@material-ui/icons/";
import { HomeContext } from "contexts";
import { Spinner } from "components"

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const JobSmallCard = props => {
  const { data } = props.data;
  const { setIsFullView, setJobId} = useContext(HomeContext);

  let content = Array.isArray(data) ? (
    <ThemeProvider theme={theme}>
      {data.map(job => {
        const {
          seniority,
          publishDate,
          positionTitle,
          location,
          industryField,
          employmentType,
          description,
          company,
          _id
        } = job;
        return (
          <Grid key={_id} container alignItems="center" style={{ padding: 10 }} >
            <Grid onClick={()=>{
                return (setIsFullView(true), setJobId(_id));
            }}>
            <Grid style={{ padding: "1vh 0" }}>
              <Typography variant="h6">{positionTitle}</Typography>
              <Typography variant="subtitle2">
                {company} on {publishDate.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid style={{ padding: "1vh 0" }}>
              <Typography variant="body1">
                {employmentType} / {location}
              </Typography>
              <Typography variamt="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna...
              </Typography>
            </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              item
              style={{ padding: "1vh 0" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<StarBorder />}
                    checkedIcon={<StarRate />}
                    value="checkedH"
                  />
                }
              />
              <Typography align="left">Save</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ height: "1vh", backgroundColor: "#F9F9F9" }}
            ></Grid>
          </Grid>
        );
      })}
      {/* <JobFullView /> */}
    </ThemeProvider>
  ) : (
    <Grid container alignItems="center" justify="center" style={{height: "60vh"}}>
      <Grid item >
        <Spinner />
      </Grid>
    </Grid>
  );
  return <>{content}</>;
};
