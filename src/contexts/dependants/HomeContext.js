import React, { createContext, useState } from "react";

export const HomeContext = createContext();

export const HomeProvider = props => {
  
  const [isUpdated, setIsUpdated] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [jobId, setJobId] = useState("");

  const { children } = props;
  return (
    <HomeContext.Provider
      value={{
        isFullView,
        setIsFullView,
        isUpdated,
        setIsUpdated,
        jobId,
        setJobId
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
