import axios from "axios"
import IWeatherForecastItem from "../interfaces/WeatherForecast";

const getHourlyWeather = async (city: string): Promise<IWeatherForecastItem[] | null> => {
 try {
    const data = (await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=da1955093e169563d88c9bf299a58cc0&units=metric`)).data.list;
    return data;
 } catch (err) {
    console.log(err);
    return null
 }
}

export default getHourlyWeather;
