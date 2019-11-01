import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {

  const [userProfile, setUserProfile] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [avatarProfile, setAvatarProfile] = useState("");
  const { children } = props;

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isUpdated,
        setIsUpdated,
        avatarProfile,
        setAvatarProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
