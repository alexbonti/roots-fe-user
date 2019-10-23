/***
 *  Created by Nirav Bhimani
 ***/
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ApplicationContext = createContext();

export const ApplicationProvider = (props) => {
  const { children } = props;
  const [programId] = useState(1);        // Program ID is accessed from context
  const [firstLoginStatus, setFirstLoginStatus] = useState(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  // Status of drawer
  const [targetView, setTargetView] = useState('');         // View name, if null/empty then drawer will render all the childrens
  const [drawerTitle, setDrawerTitle] = useState('');         // Store the title name of views when drawer

  return (
    <ApplicationContext.Provider value={{
      programId,
      firstLoginStatus,
      setFirstLoginStatus,
      isDrawerOpen,
      setIsDrawerOpen,
      targetView,
      setTargetView,
      drawerTitle,
      setDrawerTitle,
    }} >
      {children}
    </ApplicationContext.Provider>
  );
};

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
