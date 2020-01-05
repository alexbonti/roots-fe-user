import React, {useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Button, Grid, Typography } from "@material-ui/core/";
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
import { API } from "helpers";
import { LoginContext, UserContext } from "contexts";
import { MenuHamburger } from "helpers/MenuHamburger";
//import Image from "../../helpers/img/rootsheader.gif";

const useStyles = makeStyles({
  list: {
    width: "100% !important",
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
  const [isRedirect, setIsRedirect] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { setLoginStatus } = useContext(LoginContext);
  const {  userProfile  }  =  useContext(UserContext);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const logout = async () => {
    const logoutdata = await API.logout();
    if(logoutdata){
      setLoginStatus(false);
    }
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{ height: "100%" }}
    >
      <List style={{ height: "100%", paddingTop: "8px", backgroundColor:"rgba(8, 124, 149, .1)" }}>
        <Grid
          container
          justify="space-between"
          alignItems="baseline"
          direction="column"
          style={{ height: "100%"}}
        >
          <Grid item>
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{
                backgroundColor: "rgba(8,124,149, 1)", height: "53px",
              }}
            >
              <Grid item container  alignItems="center" >
                <Grid>
                <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/profile"
              >
                  <Typography variant="body1" style={{ color: "rgb(243,243,243)", fontSize: "16px", fontFamily: "Arial Rounded MD, sans-serif", fontWeight: "bold", padding:"17px 10px 18px 33px "}}>
                    My profile
                  </Typography></Link>
                </Grid>
              </Grid>
            </Grid>
       

            <ListItem button>
            
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit",  }}
                to={{pathname: "/jobs", state: {direction: "saved-jobs"}}}
              >
                <Typography style={{paddingLeft: "33.5px",fontSize: "16px", fontFamily: "Arial Rounded MD, sans-serif", fontWeight: "bold"}}>Saved Opportunities</Typography>
              </Link>
            </ListItem>

            <ListItem button>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to={{pathname: "/jobs", state: {direction: "applied-jobs"}}}
              >
                <Typography style={{paddingLeft: "33.5px",fontSize: "16px", fontFamily: "Arial Rounded MD, sans-serif", fontWeight: "bold"}}>Applied Opportunities</Typography>
              </Link>
            </ListItem>

            <ListItem button>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/search"
              >
                <Typography style={{paddingLeft: "33.5px",fontSize: "16px", fontFamily: "Arial Rounded MD, sans-serif", fontWeight: "bold"}}>Search Settings</Typography>
              </Link>
            </ListItem>
            <Grid container justify="center" style={{paddingTop: "16px"}}>
                <Grid item xs={9}>
                    <Divider style={{border: "1px solid rgba(149, 154, 156, 1)"}} />
                </Grid>
            </Grid>
            <Grid item>
            <ListItem
              button={true}
              onClick={() => logout()}
              style={{paddingLeft: "0"}}
            >
  
  <Typography style={{paddingLeft: "27px",fontSize: "16px", fontFamily: "Arial Rounded MD, sans-serif", fontWeight: "bold"}}>Log out  {"    "}  > </Typography>
            </ListItem>
          </Grid>
          </Grid>
          <Grid item >
            <ListItem
           style={{paddingLeft: "102.5px", paddingBottom: "60px"}}
            >
  
  <Typography style={{fontSize: "14px", fontFamily: "Arial Rounded MD, sans-serif", fontWeight: "bold"}}>Deakin Create</Typography>
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
        <MenuHamburger />
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
