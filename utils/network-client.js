import axios from "axios";

const networkClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOST_API_URL,
  headers: {
    "X-Custom-Header": "foobar",
  },
});

networkClient.interceptors.request.use((config) => {
  // config.headers = { "access-token": "### from next auth token ###" };
  return config;
});

networkClient.interceptors.response.use((res) => {
  return res;
});

export default networkClient;
