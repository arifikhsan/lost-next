import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 15 * 60 * 1000, // 15 menit
});

const networkServer = axios.create({
  adapter: cache.adapter,
  baseURL: process.env.LOST_API_URL,
  headers: {
    "X-Custom-Header": "foobar",
  },
});

networkServer.interceptors.request.use((response) => {
  console.log("start axios interceptor");
  console.log("Request response:", response);

  // const cookies = parseCookies();
  // const [session, loading] = useSession()
  // console.log('session: ', session)
  // console.log("request cookies: ", { cookies });

  return response;
});

networkServer.interceptors.response.use(
  (res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // console.log(res.headers);
    // console.log("start axios response");
    // setHeaders(res.headers);
    return res;
  },
  (err) => {
    return Promise.resolve(err);
  }
);

export default networkServer;
