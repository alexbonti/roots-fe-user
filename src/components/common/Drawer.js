import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
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
import {API} from 'helpers';
import {LoginContext} from 'contexts';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  backgroundColor: "green",
});

export const TemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const {setLoginStatus} = useContext(LoginContext);

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
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button={true} >
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <Link style={{textDecoration: "none", color: "inherit"}} to="/profile" ><ListItemText primary="My Profile" /></Link>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <Link style={{textDecoration: "none", color: "inherit"}} to="/jobs" ><ListItemText primary="Saved Opportunities" /></Link>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <DoneOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Applied Opportunities" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search Settings" />
        </ListItem>
        <Divider />
        <ListItem button={true} onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
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
