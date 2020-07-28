import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

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
  const [isEditMode, setIsEditMode] = useState({ status: false, id: "" });
  const [isEditGeneralProfile, setIsEditGeneralProfile] = useState(false);

  const [isAddMode, setIsAddMode] = useState(false);
  const [preferredIndustry, setPreferredIndustry] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
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
        setCoverLetterUrl,
        preferredIndustry,
        setPreferredIndustry,
        isEditGeneralProfile,
        setIsEditGeneralProfile,
        certificates,
        setCertificates
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};