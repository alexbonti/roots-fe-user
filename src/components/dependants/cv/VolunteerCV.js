import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core/";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    borderRadius: "10px 10px 0 0 ",
  },
  containerBottom: {
    backgroundColor: "white",
    borderRadius: "0px 0px 10px 10px ",
    padding: "32px 70px 32px 32px ",
  },
  transparentContainer: {
    padding: "10px 32px ",
  },
  title: {
    fontSize: 34,
  },
  title2: {
    fontSize: 24,
    fontWeigth: "lighter",
  },
  subText: {
    fontSize: 12,
  },
  rule: {
    border: "1px solid #d0d0d0",
    width: "100%",
  },
  pos: {
    marginBottom: 12,
  },
  rightIcon: {
    marginLeft: "5px",
  },
  button1: {
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #087B94",
    color: "#087B94",
  },
  button2: {
    borderRadius: "20px",
  },
  back: {
    margin: 3,
  },
  avatar: {
    heigth: "30%",
    width: "30%",
    padding: "10px",
  },
});

export const VolunteerCV = props => {
  const classes = useStyles();
  console.log(props.data);

  return props.data.length > 0 ? (
    <>
      <Container className={classes.transparentContainer}>
        <Grid container direction="column">
          <Grid item xs={4} className={classes.title}>
            Cover
          </Grid>
        </Grid>
      </Container>
      {props.data.map((e, i) => {
        return (
      <>
        <Container className={classes.transparentContainer}>
          <Grid container direction="column">
            <Grid item xs={4} className={classes.title}>
              Cover Letter
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.containerBottom}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} className={classes.subText}>
              A cover letter is like the introduction to your resume; it
              gives you a chance to show some personality and demonstrate to
              an employer that you’ve researched their company and
              understand exactly what they’re looking for.
            </Grid>
          </Grid>
        </Container>
      </>
        );
      })}
    </>
  ) : (
    ""
  );
};
