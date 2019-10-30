import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {

  const [userProfile, setUserProfile] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const { children } = props;

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isUpdated,
        setIsUpdated
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
