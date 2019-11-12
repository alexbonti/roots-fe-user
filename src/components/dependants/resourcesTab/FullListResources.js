import React, { useContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ResourceSmallCard, ResourceFullView } from "components";
import { HomeContext } from "contexts";
import { dumbData } from "../../../helpers/dumbData";



const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
  },
});
export const FullListResources = () => {
  const { isFullViewResource, dataToBeSentResources } = useContext(HomeContext);

  let list = dumbData.map((dataCategory, i) => {
    return <ResourceSmallCard key={i} data={dataCategory} />;
  });

  
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
