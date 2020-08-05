import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { Button, Grid, Typography } from "@material-ui/core/";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { API } from "helpers";
import { LoginContext, UserContext } from "contexts";
import { MenuHamburger } from "helpers/MenuHamburger";

export const TemporaryDrawer = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { setLoginStatus } = useContext(LoginContext);
  const { userProfile } = useContext(UserContext);

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
    if (logoutdata) {
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
      <List
        style={{
          height: "100%",
          paddingTop: "20px",
          backgroundColor: "rgba(8, 124, 149, .1)",
        }}
      >
        <Grid
          container
          justify="space-between"
          alignItems="baseline"
          direction="column"
          style={{ height: "100%" }}
        >
          <Grid item style={{ width: "100%" }}>
            <ListItem button>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/profile"
              >
                <Typography
                  style={{
                    paddingLeft: "5px",
                    fontSize: "16px",
                    fontFamily: "Arial Rounded MD, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  My profile
                </Typography>
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to={{ pathname: "/jobs", state: { direction: "saved-jobs" } }}
              >
                <Typography
                  style={{
                    paddingLeft: "5px",
                    fontSize: "16px",
                    fontFamily: "Arial Rounded MD, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Opportunities
                </Typography>
              </Link>
            </ListItem>

            <ListItem button>
              <Link
                user={userProfile}
                style={{ textDecoration: "none", color: "inherit" }}
                to="/search"
              >
                <Typography
                  style={{
                    paddingLeft: "5px",
                    fontSize: "16px",
                    fontFamily: "Arial Rounded MD, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Search Settings
                </Typography>
              </Link>
            </ListItem>
            <Grid container justify="center" style={{ paddingTop: "16px" }}>
              <Grid item xs={9}>
                <Divider
                  style={{ border: "1px solid rgba(149, 154, 156, 1)" }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <ListItem
                button={true}
                onClick={() => logout()}
                style={{ paddingLeft: "0" }}
              >
                <Typography
                  style={{
                    paddingLeft: "27px",
                    fontSize: "16px",
                    fontFamily: "Arial Rounded MD, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Log out {"     > "}
                </Typography>
              </ListItem>
            </Grid>
          </Grid>
          <Grid item>
            <ListItem style={{ paddingLeft: "102.5px", paddingBottom: "60px" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Arial Rounded MD, sans-serif",
                  fontWeight: "bold",
                }}
              >
                MECHID
              </Typography>
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
