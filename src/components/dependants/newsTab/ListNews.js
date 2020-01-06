import React, { useEffect, useState } from "react";
import { NewsCard, LargeNewsCard, Spinner } from "components";
import { API } from "helpers/index";
import { NewsFullView } from "components/index";
import { HomeContext } from "contexts/index";

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
      if(allNewsData){
        setNewsArray(allNewsData.response.data.data.data);
      }
    };

    triggerAPI();
  }, []);

  const content = isFullViewNews ? (
    <NewsFullView data={detailsNews} />
  ) : (
    <>
      {" "}
      <LargeNewsCard data={newsArray[0]} />
      {newsArray.map((news, i) => {
        return i !== 0 ? <NewsCard key={news.title + i} data={news} /> : "";
      })}
    </>
  );

  return newsArray.length > 0 ? <>{content}</> : <Spinner />;
};
