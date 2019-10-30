import React, { createContext, useState } from "react";

export const OnBoardingContext = createContext();

export const OnBoardingProvider = props => {

  const [activeStep, setActiveStep] = useState(0);
  const [isStart, setIsStart] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false);
  const [location, setLocation] = useState("");
  const [positionTitle, setPositionTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  
  const { children } = props;

  return (
    <OnBoardingContext.Provider
      value={{
        activeStep, 
        setActiveStep,
        isUpdated,
        setIsUpdated,
        isStart, 
        setIsStart,
        positionTitle,
        setPositionTitle,
        location,
        setLocation,
        companyName,
        setCompanyName,
        startDate,
        setStartDate,
        endDate,
        setEndDate  
      }}
    >
      {children}
    </OnBoardingContext.Provider>
  );
};
