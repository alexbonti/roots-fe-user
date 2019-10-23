import React from 'react';
import { LoginContext, LoginProvider } from './common/LoginContext';
import { LayoutContext, LayoutProvider } from './common/LayoutContext';
import { ApplicationContext, ApplicationProvider } from './dependants/ApplicationContext';

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  ApplicationContext,
  ApplicationProvider,
};

export const ContextManager = (props) => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        <ApplicationProvider>
          {children}
        </ApplicationProvider>
      </LoginProvider>
    </LayoutProvider>
  );
};
