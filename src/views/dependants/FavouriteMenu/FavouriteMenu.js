import React from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FavouriteConfig from './favouriteConfig.json';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.grey,
  },
  menu: {
    width: '100%',
    height: '100%'
  },
  menuMobile: {
    paddingTop: 0,
    width: '100%',
    height: '100%'
  },
  menuItemText: {
    marginLeft: '5vw'
  },
  menuTitle: {
    paddingTop: "5vh",
    paddingBottom: "5vh",
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 1px rgba(76,45,45,0.80)'
  },
  logoutButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    paddingLeft: "5vw",
    paddingRight: "5vw"
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "5vw",
    paddingRight: "5vw"
  }
}));

export const FavouriteMenu = () => {
  const classes = useStyles();
  const items = FavouriteConfig.menuItems;

  let content = (
    <div className={classes.root}>
      <List
        className={FavouriteConfig.displayMobileHeader ? classes.menuMobile : classes.menu}>
        {
          items.map((value, key) => {
            return (
              <div key={key}>
                <ListItem button component={Link} className={classes.listItem} to={value.controller} divider>
                  <ListItemText className={classes.menuItemText} primary={value.name} />
                </ListItem>
              </div>
            );
          })
        }
      </List>
    </div>
  );
  return content;
};
