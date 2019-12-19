import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Button, Grid, Typography, Avatar } from "@material-ui/core/";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Icon from "@material-ui/core/Icon";
import { API } from "helpers";
import { LoginContext, UserContext } from "contexts";
import Image from "../../helpers/img/rootsheader.gif";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  item: {
    "&:focus": {
      backgroundColor: "white",
    },
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

export const TemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { setLoginStatus } = useContext(LoginContext);
  const { userName, userLastName, userProfile } = useContext(UserContext);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const logout = () => {
    API.logout();
    setLoginStatus(false);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{ height: "100%", backgroundColor: "white", width: "100%" }}
    >
      <List style={{ height: "100%", paddingTop: "0" }}>
        <Grid
          container
          justify="space-between"
          alignItems="baseline"
          direction="column"
          style={{ height: "100%" }}
        >
          <Grid item>
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{
                backgroundColor: "#065a6d",
                backgroundImage:
                  " linear-gradient(242deg, #065a6d 0%, #087b94 58%, #0e91b1 100%)",
                height: "15vh",
              }}
            >
              <Grid item container justify="space-evenly" alignItems="center">
                <Grid>
                  <Avatar variant="rounded" sizes="large" src={Image} className={classes.bigAvatar}/>
                </Grid>
                <Grid>
                  <Typography variant="body1" style={{ color: "white" }}>
                    Welcome,
                  </Typography>
                  <Typography variant="h6" style={{ color: "white" }}>
                    {userName} {userLastName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <ListItem button={true} className={classes.item}>
              <ListItemIcon>
                <AssignmentIndIcon style={{ color: "#065a6d" }} />
              </ListItemIcon>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/profile"
              >
                <ListItemText primary="My Profile" />
              </Link>
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <StarBorderIcon style={{ color: "#065a6d" }} />
              </ListItemIcon>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/jobs"
              >
                <ListItemText primary="Saved Opportunities" />
              </Link>
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <DoneOutlineIcon style={{ color: "#065a6d" }} />
              </ListItemIcon>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/jobs"
              >
                <ListItemText primary="Applied Opportunities" />
              </Link>
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <SearchIcon style={{ color: "#065a6d" }} />
              </ListItemIcon>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/search"
              >
                <ListItemText primary="Search Settings" />
              </Link>
            </ListItem>
            <Divider />
          </Grid>
          <Grid item>
            <ListItem
              button={true}
              onClick={() => logout()}
              style={{ bottom: "0", position: "relative" }}
            >
              <ListItemIcon>
                <ExitToAppIcon style={{ color: "#065a6d" }} />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        {" "}
        <Icon style={{ color: "#FFFFFF" }}>list</Icon>
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
};
