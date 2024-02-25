import Cookies from "js-cookie";
import WeatherData from "../interfaces/weatherData";

const getCookie = (cookieTitle:string): WeatherData[] | null => {
    const cookieValue = Cookies.get(cookieTitle);
    if (cookieValue) {
        return JSON.parse(cookieValue);
    }
    return null; 
}

export default getCookie