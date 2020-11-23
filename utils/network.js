import axios from "axios";

const network = axios.create({
  baseURL: process.env.LOST_API_URL,
  headers: {
    "X-Custom-Header": "foobar",
  },
});

network.interceptors.request.use((config) => {
  // console.log("start axios interceptor");

  // const cookies = parseCookies();
  // const [session, loading] = useSession()
  // console.log('session: ', session)
  // console.log("request cookies: ", { cookies });

  // config.headers = {
  //   "access-token": cookies.get("access-token") || "",
  //   "token-type": cookies.get("token-type") || "",
  //   client: cookies.get("client") || "",
  //   uid: cookies.get("uid") || "",
  //   expiry: cookies.get("expiry") || "",
  // };
  return config;
});

network.interceptors.response.use(
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

export default network;
