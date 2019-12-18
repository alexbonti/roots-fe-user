import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL + '/api/';
const newsUrl = "http://localhost:8061/api/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const axiosInstanceNews = axios.create({
  baseURL: newsUrl,
});


