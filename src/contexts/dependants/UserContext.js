import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API } from "helpers";

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
  const [userProfileSetupComplete, setUserProfileSetupComplete] = useState();

  const [isAddMode, setIsAddMode] = useState(false);
  const [preferredIndustry, setPreferredIndustry] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const { children } = props;

  useEffect(() => {
    (async () => {
      const response = await API.getUserProfile();
      if (response.success) {
        if (response?.response?.userProfileSetupComplete) {
          return setUserProfileSetupComplete(true);
        }
        setUserProfileSetupComplete(false);
      } else if (response.success === false)
        return setUserProfileSetupComplete(false);
    })();
  }, []);

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
        setCertificates,
        userProfileSetupComplete,
        setUserProfileSetupComplete
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};