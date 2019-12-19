import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Grid, Typography } from "@material-ui/core";
import { LoginContext } from "contexts";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
//import API from "../../helpers/api";
import { TemporaryDrawer } from "../index";
import { UserContext } from "contexts/index";
import FallBackAvatar from "../../helpers/img/man.svg";

// import { AccessToken } from "contexts/helpers/index";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 2, // keep right padding when drawer closed
    backgroundColor: "#2C2C29",
    height: "9vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  // const logout = () => {
  //   const logOut = async auth => {
  //     const putLogout = await API.logout(auth);
  //     window.localStorage.clear();
  //     setLoginStatus(false);
  //     setAccessToken("");
  //     console.log(putLogout);
  //   };

  //   logOut(accessToken);
  // };

  const ImageAvatar =
    avatarProfile === "" ||
    avatarProfile === undefined ||
    avatarProfile === "string"
      ? FallBackAvatar
      : avatarProfile;
  console.log(ImageAvatar);
  let registerStatus = {
    menu: !loginStatus ? "" : <TemporaryDrawer />,
    avatar: !loginStatus ? (
      ""
    ) : (
      <Link to="/profile" state={"test"}>
        <Avatar src={ImageAvatar}></Avatar>
      </Link>
    ),
  };

  let content = (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.toolbar}>
        <Grid container justify="space-between" style={{ paddingLeft: "5vw" }}>
          <Grid item>{registerStatus.avatar}</Grid>

          <Grid item align="center">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h4">ROOTS</Typography>
            </Link>
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
