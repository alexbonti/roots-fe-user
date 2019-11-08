/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginContext, UserContext } from "contexts";
import { Login, Register, Home, RegistrationConfirmation, OnBoarding, Profile } from "views";
import { Layout } from "../layout";

export const AppRoutes = props => {
  const { loginStatus } = useContext(LoginContext);
  const {userProfile} = useContext(UserContext)
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const {firstLogin} = {userProfile};


  useEffect(() => {
    if (loginStatus) setRedirectToLogin(false);
    else setRedirectToLogin(true);
  }, [loginStatus]);
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          redirectToLogin ? (
            <Redirect to={{ pathname: "/login" }} {...props} />
          ) : (
            <Redirect to={{ pathname: "/home" }} {...props} />
          )
        }
      />
      <Route
        exact
        path="/login"
        render={() =>
          !redirectToLogin ? (
            <Redirect to={{ pathname: "/home" }} {...props} />
          ) : (
            <Login {...props} />
          )
        }
      />
      <Route
        exact
        path="/register"
        render={() =>
          !redirectToLogin ? (
            <Redirect to={{ pathname: "/home" }} {...props} />
          ) : (
            <Register {...props} />
          )
        }
      />
      <Layout>
        <Route
          exact
          path="/home"
          render={() =>
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : (
              <Home {...props} />
            )
          }
        />
        <Route
          exact
          path="/registerSuccess"
          render={() =>
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : (
              <RegistrationConfirmation {...props} />
            )
          }
        />
      
        <Route
          exact
          path="/onboarding"
          render={() => 
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : (
              <OnBoarding {...props} />
            )
          }
        />
        <Route
          exact
          path="/profile"
          render={() => 
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : (
              <Profile {...props} />
            )
          }
        />
      </Layout>
    </Switch>
  );
};
