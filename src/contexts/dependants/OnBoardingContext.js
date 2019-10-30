import React, { createContext, useState } from "react";

export const OnBoardingContext = createContext();

export const OnBoardingProvider = props => {

  const [activeStep, setActiveStep] = useState(0);
  const [isStart, setIsStart] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false);
  const { children } = props;

  return (
    <OnBoardingContext.Provider
      value={{
        activeStep, 
        setActiveStep,
        isUpdated,
        setIsUpdated,
        isStart, setIsStart
      }}
    >
      {children}
    </OnBoardingContext.Provider>
  );
};
