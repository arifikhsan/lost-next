import { parseCookies, setCookie } from "nookies";

const setHeaders = (headers) => {
  // console.log("headers accesstoken: ", headers['access-token']);
  // if (headers["access-token"]) {
  //   insertCookie("access-token", headers["access-token"]);
  //   insertCookie("token-type", headers["token-type"]);
  //   insertCookie("client", headers["client"]);
  //   insertCookie("uid", headers["uid"]);
  //   insertCookie("expiry", headers["expiry"]);
  // }
  setCookie(null, 'aaaa', 'value', { maxAge: 14 * 24 * 60 * 60, path: "/" });
  const c = parseCookies();
  // console.log("parseCookies: ", c );
};

const insertCookie = (name, value) => {
  setCookie(null, name, value, { maxAge: 14 * 24 * 60 * 60, path: "/" });
};

export { setHeaders };
