import Cookies from "js-cookie";

const setCookies = (cookieTitle: string, data: any) => {
  Cookies.set(cookieTitle, JSON.stringify(data));
};

export default setCookies;
