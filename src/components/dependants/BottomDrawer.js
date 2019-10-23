import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SwipeableDrawer } from "@material-ui/core";
import PropTypes from 'prop-types';
import { ApplicationContext } from 'contexts';

/**
 * 
 * @param {Object} drawerStyle Custom style for drawer 
 */
export const BottomDrawer = props => {
  const useStyles = makeStyles({
    drawerStyle: {
      width: "100vw",
      height: "100vh",
      ...props.drawerStyle,           // Overrides the previous styles
    }
  });

  const classes = useStyles();
  const { isDrawerOpen, setIsDrawerOpen, setTargetView } = useContext(ApplicationContext);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div>
      <SwipeableDrawer
        disableBackdropTransition={!iOS} disableDiscovery={iOS}
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); setTargetView(''); }}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <div className={classes.drawerStyle}>
          {props.children}
        </div>
      </SwipeableDrawer>
    </div>
  );
};


BottomDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  drawerStyle: PropTypes.object,
};
