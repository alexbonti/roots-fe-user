/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext } from "react";
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

  const userOnboardingStatusCheck = (node) => {
    if (userProfileSetupComplete === undefined)
      return <Spinner />;
    if (userProfileSetupComplete === false)
      return <Redirect to={{ pathname: "/onboarding" }} {...props} />;
    return node;
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          loginStatus ? (
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
          loginStatus ?
            userOnboardingStatusCheck(<Redirect to={{ pathname: "/home" }} {...props} />) :
            <Login {...props} />
        }
      />
      <Route
        exact
        path="/register"
        render={() =>
          loginStatus ? (
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
            !loginStatus ?
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
          render={() => !loginStatus ? (
            <Redirect to={{ pathname: "/login" }} {...props} />
          ) :
            <RegisterSuccess {...props} />
          }
        />

        <Route
          exact
          path="/onboarding"
          render={() =>
            !loginStatus ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) :
              <OnBoarding {...props} />
          }
        />
        <Route
          exact
          path="/profile"
          render={() =>
            !loginStatus ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) :
              <Profile {...props} />
          }
        />
        <Route
          exact
          path="/jobs"
          render={() =>
            !loginStatus ? (
              <Redirect to={{ pathname: "/login" }} {...props} />
            ) : <SavedAndAppliedJobs {...props} />

          }
        />
        <Route
          exact
          path="/search"
          render={() =>
            !loginStatus ?
              <Redirect to={{ pathname: "/login" }} {...props} />
              :
              <SearchSettings {...props} />

          }
        />
      </Layout>
    </Switch>
  );
};
