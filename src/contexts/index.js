import React from "react";
import { LoginContext, LoginProvider } from "./common/LoginContext";
import { LayoutContext, LayoutProvider } from "./common/LayoutContext";
import { HomeContext, HomeProvider } from "./dependants/HomeContext";
import { UserContext, UserProvider } from "./dependants/UserContext";
import {
  EditOpportunityContext,
  EditOpportunityProvider,
} from "./dependants/EditOpportunityContext";
import {
  MyCompanyContext,
  MyCompanyProvider,
} from "./dependants/MyCompanyContext";
import {
  CandidateContext,
  CandidateProvider,
} from "./dependants/CandidateContext";

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
  EditOpportunityContext,
  EditOpportunityProvider,
  MyCompanyContext,
  MyCompanyProvider,
  CandidateContext,
  CandidateProvider,
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
              <EditOpportunityProvider>
                <MyCompanyProvider>
                  <CandidateProvider>
                    <EditOpportunityProvider>
                      <TextEditorProvider>{children}</TextEditorProvider>
                    </EditOpportunityProvider>
                  </CandidateProvider>
                </MyCompanyProvider>
              </EditOpportunityProvider>
            </HomeProvider>
          </OnBoardingProvider>
        </UserProvider>
      </LoginProvider>
    </LayoutProvider>
  );
};
