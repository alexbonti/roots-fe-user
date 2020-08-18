import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { API } from "helpers";
import { LoginContext } from "contexts/common/LoginContext";

export const UserContext = createContext();

export const UserProvider = props => {
  const { loginStatus } = useContext(LoginContext)

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

  const loadProfileStatus = useCallback(async () => {
    const response = await API.getUserProfile();
    if (response.success) {
      if (response?.response?.userProfileSetupComplete) {
        return setUserProfileSetupComplete(true);
      }
      setUserProfileSetupComplete(false);
    } else if (response.success === false)
      return setUserProfileSetupComplete(false);
  }, []);

  const resetUserDetails = useCallback(() => {
    setAvatarProfile("");
    setUserProfile({});
    setUserLastName("");
    setUserName("");
    setUserEmail("");
    setIsUpdated(false);
    setSkills([]);
    setIsEditGeneralProfile("");
    setPreferredIndustry([]);
    setIsAddMode(false);
    setCertificates([]);
  }, []);

  useEffect(() => {
    if (loginStatus === true) {
      loadProfileStatus();
    } else if (loginStatus === false) {
      setUserProfileSetupComplete(false);
    }

  }, [loginStatus, loadProfileStatus]);

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
        setUserProfileSetupComplete,
        loadProfileStatus,
        resetUserDetails
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};