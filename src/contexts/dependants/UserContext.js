import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [avatarProfile, setAvatarProfile] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [coverLetterUrl, setCoverLetterUrl] = useState("");

  const [isEditMode, setIsEditMode] = useState({status: false, id:""});
  const [isAddMode, setIsAddMode] = useState(false);
  const [skills, setSkills] = useState([]);
  const { children } = props;

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userLastName,
        setUserLastName,
        userEmail,
        setUserEmail,
        userProfile,
        setUserProfile,
        isUpdated,
        setIsUpdated,
        avatarProfile,
        setAvatarProfile,
        fileURL,
        setFileURL,
        isEditMode,
        setIsEditMode,
        isAddMode,
        setIsAddMode,
        skills, 
        setSkills,
        coverLetterUrl, 
        setCoverLetterUrl
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
