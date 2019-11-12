import React from "react";
import { LoginContext, LoginProvider } from "./common/LoginContext";
import { LayoutContext, LayoutProvider } from "./common/LayoutContext";
import { HomeContext, HomeProvider } from "./dependants/HomeContext";
import { UserContext, UserProvider } from "./dependants/UserContext";
import {
  TextEditorContext,
  TextEditorProvider,
} from "./dependants/TextEditorContext";

import {
  OnBoardingContext,
  OnBoardingProvider,
} from "./dependants/OnBoardingContext";

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  HomeContext,
  HomeProvider,
  TextEditorContext,
  TextEditorProvider,
  UserContext,
  UserProvider,
  OnBoardingContext,
  OnBoardingProvider,
};

export const ContextManager = props => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        <UserProvider>
          <OnBoardingProvider>
            <HomeProvider>
              <TextEditorProvider>{children}</TextEditorProvider>
            </HomeProvider>
          </OnBoardingProvider>
        </UserProvider>
      </LoginProvider>
    </LayoutProvider>
  );
};
