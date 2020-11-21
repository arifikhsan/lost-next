import Cookies from "universal-cookie";

const cookies = new Cookies();

const setHeaders = (headers) => {
  if (headers["access-token"]) {
    cookies.set("access-token", headers["access-token"], { path: "/" });
    cookies.set("token-type", headers["token-type"], { path: "/" });
    cookies.set("client", headers["client"], { path: "/" });
    cookies.set("uid", headers["uid"], { path: "/" });
    cookies.set("expiry", headers["expiry"], { path: "/" });
  }
};

export { setHeaders, cookies };
