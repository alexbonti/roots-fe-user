import React, { useEffect, useState, useContext } from "react";
import { NewsCard, LargeNewsCard, Spinner, } from "components";
import { API } from "helpers/index";
import { NewsFullView } from "components/index";
import { HomeContext } from "contexts/index";
import { createMuiTheme, Grid } from "@material-ui/core/";
import { ThemeProvider } from "@material-ui/core/styles";
import { LoginContext } from "contexts";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#087B94" },
    secondary: { main: "#C74197" },
    terziary: { main: "#2B2B28" },
    accent: { main: "#FFD922" },
    error: { main: "#D0011B" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
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
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
  },
});
export const ListNews = () => {
  const [newsArray, setNewsArray] = useState();
  const { loginStatus } = useContext(LoginContext);

  const { detailsNews, isFullViewNews } = React.useContext(HomeContext);

  useEffect(() => {
    if (loginStatus)
      (async () => {
        let data = {
          "category": "",
          "numberOfRecords": 0,
        };
        const allNewsData = await API.getNews(data);
        if (allNewsData.success) {
          setNewsArray(allNewsData?.response);
        }
      })();

  }, [loginStatus]);

  if (newsArray === undefined || !Array.isArray(newsArray)) return <Spinner />;
  const content = isFullViewNews ?
    <ThemeProvider theme={theme}>
      <NewsFullView data={detailsNews} />
    </ThemeProvider>
    :
    <ThemeProvider theme={theme}>
      <LargeNewsCard data={Array.isArray(newsArray) ? newsArray[0] : []} />
      {Array.isArray(newsArray) && newsArray.length > 0 && <Grid container spacing={2}>
        {newsArray.map((news, i, array) => {
          if (i === 0) return null;
          if (i === array.length - 1)
            return <NewsCard key={news.title + i} data={news} />;
          return <NewsCard key={news.title + i} data={news} displayDivider />;
        })}
      </Grid>
      }</ThemeProvider>;


  return content;

};
