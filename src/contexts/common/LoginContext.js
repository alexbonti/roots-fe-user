/***
 *  Created by Sanchit Dang
 ***/
import React, { createContext, useState, useEffect } from "react";

/**
 * @AccessToken
 * @LoginStatus
 * @DevMode
 *
 * can be used by VanilaJS to check respective status
 */
export var AccessToken = localStorage.getItem("accessToken");
export var LoginStatus = localStorage.getItem("loginStatus");
export var DevMode = localStorage.getItem("devMode");

export const LoginContext = createContext();
let logoutFunction;

export const logout = async init => {
  if (init !== undefined) await init();
  logoutFunction();
};
export const LoginProvider = props => {
  const { children } = props;
  const [devMode, _setDevMode] = useState(DevMode !== "" ? DevMode : false);
  const [loginStatus, _setLoginStatus] = useState(LoginStatus);
  const [accessToken, _setAccessToken] = useState(AccessToken);

  /**
   * Functions
   *
   * setLoginStatus()
   * setDevMode()
   * setAccessToken()
   *
   * are wrapperfunctions which changes respective values in localStorage, Context and VanilaJS Global Variables
   */

  const setLoginStatus = data => {
    window.localStorage.setItem("loginStatus", data);
    LoginStatus = data;
    _setLoginStatus(data);
  };
  const setDevMode = data => {
    window.localStorage.setItem("devMode", data);
    DevMode = data;
    _setDevMode(data);
  };
  const setAccessToken = data => {
    AccessToken = data;
    window.localStorage.setItem("accessToken", data);
    _setAccessToken(data);
  };
  const [openModal, setOpenModal] = useState(false);

  const logoutUser = async init => {
    if (init instanceof Function) {
      init();
    }
    window.localStorage.setItem("loginStatus", false);
    LoginStatus = false;
    _setLoginStatus(false);
  };
  useEffect(() => {
    logoutFunction = logoutUser;
  }, []);

  useEffect(() => {
    if (accessToken) {
      setLoginStatus(true);
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!loginStatus) setAccessToken("");
  }, [loginStatus]);

  useEffect(() => {
    if (DevMode !== "true") _setDevMode(false);
  }, []);

  useEffect(() => {
    if (!accessToken) setLoginStatus(false);
  }, [devMode, accessToken]);

  return (
    <LoginContext.Provider
      value={{
        loginStatus,
        accessToken,
        devMode,
        setAccessToken,
        setLoginStatus,
        setDevMode,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
