import React, { useContext } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ResourceSmallCard, ResourceFullView } from "components";
import { HomeContext } from "contexts";
import { dumbData } from "../../../helpers/dumbData";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    padding: 0,
    // padding: "3vh 0 0 0",
  },
  tabs: {
    height: "100%",
    boxShadow: "none",
    padding: 0,
  },

  tab: {
    height: "100%",
    alignSelf: "flex-end",
    border: "1px solid #f0f0f0",
    borderTop: "none",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
  },
});
export const FullListResources = () => {
  const classes = useStyles();
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
