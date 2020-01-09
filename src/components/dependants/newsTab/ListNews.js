import React, { useEffect, useState } from "react";
import { NewsCard, LargeNewsCard, Spinner } from "components";
import { API } from "helpers/index";
import { NewsFullView } from "components/index";
import { HomeContext } from "contexts/index";
import { createMuiTheme } from "@material-ui/core/";
import { ThemeProvider } from "@material-ui/core/styles";

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
  const [newsArray, setNewsArray] = useState([]);

  const { detailsNews, isFullViewNews } = React.useContext(HomeContext);

  useEffect(() => {
    const triggerAPI = async () => {
      let data = {
        "category": "ROOTS",
        "numberOfRecords": 10,
      };
      const allNewsData = await API.getNews(data);
      if (allNewsData) {
        setNewsArray(allNewsData.response.data.data.data);
      }
    };

    triggerAPI();
  }, []);

  const content = isFullViewNews ? (
    <ThemeProvider theme={theme}>
      <NewsFullView data={detailsNews} />
    </ThemeProvider>
  ) : (
    <>
      <ThemeProvider theme={theme}>
        {" "}
        <LargeNewsCard data={newsArray[0]} />
        {newsArray.map((news, i) => {
          return i !== 0 ? <NewsCard key={news.title + i} data={news} /> : "";
        })}
      </ThemeProvider>
    </>
  );

  return newsArray.length > 0 ? <>{content}</> : <Spinner />;
};
