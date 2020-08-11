/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginContext } from "contexts";
import {
  Login,
  Register,
  Home,
  RegistrationConfirmation,
  OnBoarding,
  Profile,
  SavedAndAppliedJobs,
  SearchSettings,
} from "views";
import { Layout } from "../layout";
import { ResetPassword, ResetPasswordSecondStep, RegisterSuccess } from "views/index";
import { UserContext } from "contexts/index";
import { Spinner } from "components/index";

export const AppRoutes = props => {
  const { loginStatus } = useContext(LoginContext);
  const { userProfileSetupComplete } = useContext(UserContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const userOnboardingStatusCheck = (node) => {
    if (userProfileSetupComplete === undefined)
      return <Spinner />;
    if (userProfileSetupComplete === false)
      return <Redirect to={{ pathname: "/onboarding" }} {...props} />;
    return node;
  };

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
          ) :
            userOnboardingStatusCheck(<Redirect to={{ pathname: "/home" }} {...props} />)
        }
      />
      <Route
        exact
        path="/ResetPassword"
        render={() => <ResetPassword  {...props} />
        }
      />
      <Route
        exact
        path="/ResetPasswordSecondStep"
        render={() => <ResetPasswordSecondStep  {...props} />
        }
      />
      <Route
        exact
        path="/login"
        render={() =>
          !redirectToLogin ?
            <Redirect to={{ pathname: "/home" }} {...props} /> :
            userOnboardingStatusCheck(<Login {...props} />)
        }
      />
      <Route
        exact
        path="/register"
        render={() =>
          !redirectToLogin ? (
            userOnboardingStatusCheck(<Redirect to={{ pathname: "/home" }} {...props} />)
          ) :
            <Register {...props} />
        }
      />
      <Layout>
        <Route
          exact
          path="/home"
          render={() =>
            redirectToLogin ?
              <Redirect to={{ pathname: "/login" }} {...props} />
              : userOnboardingStatusCheck(<Home {...props} />)
          }
        />

        <Route
          exact
          path="/registerSuccess"
          render={() => <RegistrationConfirmation {...props} />}
        />

        <Route
          exact
          path="/registerEnd"
          render={() => redirectToLogin ? (
            <Redirect to={{ pathname: "/login" }} {...props} />
          ) :
            <RegisterSuccess {...props} />
          }
        />

        <Route
          exact
          path="/onboarding"
          render={() =>
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) :
              <OnBoarding {...props} />
          }
        />
        <Route
          exact
          path="/profile"
          render={() =>
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) :
              <Profile {...props} />
          }
        />
        <Route
          exact
          path="/jobs"
          render={() =>
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : (
                <SavedAndAppliedJobs {...props} />
              )
          }
        />
        <Route
          exact
          path="/search"
          render={() =>
            redirectToLogin ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : (
                <SearchSettings {...props} />
              )
          }
        />
      </Layout>
    </Switch>
  );
};
