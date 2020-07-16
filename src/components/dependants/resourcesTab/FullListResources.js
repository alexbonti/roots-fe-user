import React, { useState, useContext, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ResourceSmallCard, ResourceFullView } from "components";
import { HomeContext } from "contexts";
import { API } from "helpers";
import { Spinner } from "components/index";
import { LoginContext } from "contexts";


const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
  },
  typography: {
    h5: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 21,
    },
    body1: {
      fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
      fontSize: 14,
      fontWeight: "300"
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 }
  }
});
export const FullListResources = () => {
  const [resourceArray, setResourceArray] = useState([]);
  const { loginStatus } = useContext(LoginContext);


  useEffect(() => {
    if (loginStatus) {
      let accumulator = resourceArray;
      const categories = ["LEGAL ADVICE", "PROGRAMS", "ORGANIZATIONS"];
      const triggerAPI = async categorie => {
        let data = {
          "category": categorie,
          "numberOfRecords": 10,
        };

        const allNewsData = await API.getNews(data);
        if (allNewsData && allNewsData.response.data.data.data.length > 0) {
          accumulator.push({
            categorie,
            data: allNewsData.response.data.data.data,
          });
        }
        setResourceArray(accumulator);
      };

      categories.forEach(categorie => triggerAPI(categorie));

    }
  }, [resourceArray, loginStatus]);


  const { isFullViewResource, dataToBeSentResources } = useContext(HomeContext);

  let list =
    resourceArray.length > 0 && resourceArray !== undefined ? (
      resourceArray.map((dataCategory, i) => {
        return <ResourceSmallCard key={i} data={dataCategory} />;
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
