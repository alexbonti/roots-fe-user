import React, { createContext, useState } from "react";

export const HomeContext = createContext();

export const HomeProvider = props => {
  
  const [isUpdated, setIsUpdated] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [isFullViewResource, setIsFullViewResource] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [userWantsToApply, setUserWantsToApply] = useState(false);
  const [dataToBeSentResources, setDataToBeSentResources] = useState({});
  const [jobId, setJobId] = useState("");
  const [listSavedJobs, setListSavedJobs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [test, setTest] = useState("test")
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isFullViewNews, setIsFullViewNews] = useState(false);
  const [isFullViewSaved, setIsFullViewSaved] = useState(false);
  const [isFullViewApplied, setIsFullViewApplied] = useState(false);
  const [detailsNews, setDetailsNews] = useState("");

  const { children } = props;
  return (
    <HomeContext.Provider
      value={{
        isFullView,
        setIsFullView,
        isUpdated,
        setIsUpdated,
        jobId,
        setJobId,
        userWantsToApply,
        setUserWantsToApply,
        progressBar,
        setProgressBar,
        isFullViewResource,
        setIsFullViewResource,
        dataToBeSentResources,
        setDataToBeSentResources,
        listSavedJobs,
        setListSavedJobs,
        filteredData, 
        setFilteredData,
        isFilterOn, 
        setIsFilterOn,
        detailsNews, 
        setDetailsNews,
        isFullViewNews, 
        setIsFullViewNews,
        isFullViewApplied, 
        setIsFullViewApplied,
        isFullViewSaved, 
        setIsFullViewSaved,
        test, 
        setTest

      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
