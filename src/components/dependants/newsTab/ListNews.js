import React, { useEffect, useState } from "react";
import { NewsCard, LargeNewsCard, Spinner } from "components";
import { API } from "helpers/index";
import { NewsFullView } from "components/index";

export const ListNews = () => {
  const [newsArray, setNewsArray] = useState([]);
  const [isFullView, setIsFullView] = useState(false);
  const [details, setDetails] = useState("");

  useEffect(() => {
    const triggerAPI = async () => {
      let data = {
        "category": "Medium",
        "numberOfRecords": 10,
      };
      const allNewsData = await API.getNews(data);
      setNewsArray(allNewsData.response.data.data.data);
    };

    triggerAPI();
  }, []);

  const openFullView = data => {
    setDetails(data);
    setIsFullView(true);
  };

  const content = isFullView ? (
    <NewsFullView data={details} />
  ) : (
    <>
      {" "}
      <LargeNewsCard data={newsArray[0]} onClick={() => openFullView(newsArray[0])} />
      {newsArray.map((news, i) => {
        if (i !== 0) {
          return (
            <NewsCard
              key={news.title + i}
              data={news}
            />
          );
        }
      })}
    </>
  );

  return newsArray.length > 0 ? <>{content}</> : <Spinner />;
};
