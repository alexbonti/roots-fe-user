import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Grid, Typography } from "@material-ui/core";
import { LoginContext } from "contexts";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TemporaryDrawer } from "../index";
import { UserContext } from "contexts/index";
import FallBackAvatar from "../../helpers/img/man.svg";
import Logo from "../../helpers/img/favicon.png";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 2, // keep right padding when drawer closed
    backgroundColor: "#2C2C29",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...theme.mixins.toolbar
  },
  avatar: {
    margin: 10,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  toolbarIcon: {
    display: "flex",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },

  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonTop: {
    margin: theme.spacing(1),
    borderRadius: "1.8rem",
    border: "2px solid #FFD922 ",
    color: "#FFD922",
    fontSize: ".73rem",
  },
  login: {
    textDecoration: "none",
    color: "white",
    marginLeft: ".5rem",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#f5f5f5" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const Header = () => {
  const classes = useStyles();
  const { loginStatus } = useContext(LoginContext);
  const { avatarProfile } = useContext(UserContext);


  const ImageAvatar =
    avatarProfile === "" ||
      avatarProfile === undefined ||
      avatarProfile === "string"
      ? FallBackAvatar
      : avatarProfile;
  let registerStatus = {
    menu: !loginStatus ? "" : <TemporaryDrawer />,
    avatar: !loginStatus ? null :
      <Link to="/profile" state={"test"}>
        <Avatar src={ImageAvatar}></Avatar>
      </Link>
  };

  let content = (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.toolbar}>
        <Grid container justify="space-between">
          <Grid item style={{ paddingLeft: "2vw" }}>
            {registerStatus.avatar}
          </Grid>

          <Grid item xs={6} container justify="center" alignItems="center">
            <Grid item xs={3} align="right" style={{ margin: "0 -4px", marginLeft: "8vw" }}>
              <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  style={{ height: "41px" }}
                />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  style={{
                    fontSize: "20px",
                    fontFamily: "\"Arial\", \" Roboto\", \"Helvetica\", sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {process.env.REACT_APP_NAME}
                </Typography>
              </Link>
            </Grid>
          </Grid>

          <Grid item align="center">
            {registerStatus.menu}
          </Grid>
        </Grid>
      </AppBar>
    </ThemeProvider>
  );
  //<Avatar src={Image}></Avatar>
  return content;
};
