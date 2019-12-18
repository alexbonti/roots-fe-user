import React, { useState, useContext, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ResourceSmallCard, ResourceFullView } from "components";
import { HomeContext } from "contexts";
import { API } from "helpers";
import { Spinner } from "components/index";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
  },
});
export const FullListResources = () => {
  const [resourceArray, setResourceArray] = useState([]);

  useEffect(() => {
    let accumulator = resourceArray;
    const categories = ["LEGAL ADVICE", "PROGRAMS", "ORGANIZATIONS"];
    const triggerAPI = async categorie => {
      let data = {
        "category": categorie,
        "numberOfRecords": 10,
      };

      const allNewsData = await API.getNews(data);
      if(allNewsData && allNewsData.response.data.data.data.length > 0){
        accumulator.push({
          categorie,
          data: allNewsData.response.data.data.data,
        });
      }
      setResourceArray(accumulator);
    };

    categories.forEach(categorie => triggerAPI(categorie));
  }, [resourceArray]);

 
  const { isFullViewResource, dataToBeSentResources } = useContext(HomeContext);

  let list =
    resourceArray.length > 0 && resourceArray !== undefined ? (
      resourceArray.map((dataCategory, i) => {
        return <ResourceSmallCard key={i}  data={dataCategory} />;
      })
    ) : (
      <Spinner />
    );

  let content = isFullViewResource ? (
    <ResourceFullView data={dataToBeSentResources} />
  ) : (
    list
  );

  return (
    <>
      <ThemeProvider theme={theme}>{content}</ThemeProvider>
    </>
  );
};
