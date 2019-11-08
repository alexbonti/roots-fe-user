import React, { useState, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Grid,
} from "@material-ui/core";
import { LoginContext } from "contexts";

import ExitToApp from "@material-ui/icons/ExitToApp";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import API from "../../helpers/api";
import { TemporaryDrawer } from "../index";
import { UserContext } from "contexts/index";

// import { AccessToken } from "contexts/helpers/index";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 2, // keep right padding when drawer closed
    backgroundColor: "#2C2C29",
    height: "9vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    setAccessToken,
    setLoginStatus,
    loginStatus,
    accessToken,
  } = useContext(LoginContext);
  const { avatarProfile} = useContext(UserContext);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const logout = () => {
    const logOut = async auth => {
      const putLogout = await API.logout(auth);
      window.localStorage.clear();
      setLoginStatus(false);
      setAccessToken("");
      console.log(putLogout);
    };

    logOut(accessToken);
  };

  let firstLetter = "";
  let menu = !loginStatus ? "" : <TemporaryDrawer />;

  let avatarSrc = avatarProfile !== "" ? avatarProfile : "A";

  if (avatarProfile !== "") {
    firstLetter = "";
  } else {
    firstLetter = "A";
  }

  let content = (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.toolbar}>
        <Grid container  justify="space-between">
          <Grid item align="center" xs={2}>
            <Link to="/profile"><Avatar src={avatarProfile}>{firstLetter}</Avatar></Link>
          </Grid>

          <Grid item align="center" xs={2}>
            <Link to="/"><Avatar>C</Avatar></Link>
          </Grid>

          <Grid item align="center" xs={2}>
            {menu}
          </Grid>
        </Grid>
      </AppBar>
    </ThemeProvider>
  );
  return content;
};
