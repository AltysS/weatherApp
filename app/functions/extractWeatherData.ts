// // extractWeatherData.ts
// import ICityWeather from "../interfaces/weather";
// import WeatherData from "../interfaces/weatherData";

// const extractWeatherData = (weatherData: ICityWeather): WeatherData => {
//     const temperature = Math.ceil(Number(weatherData.main.temp) - 273.15);
//     const feelsLike = Math.ceil(Number(weatherData.main.feels_like) - 273.15);
//     const minTemperature = Math.ceil(Number(weatherData.main.temp_min) - 273.15);
//     const maxTemperature = Math.ceil(Number(weatherData.main.temp_max) - 273.15);
//     const description = weatherData.weather[0].description;
//     const city = weatherData.name;

//     return {
//         temperature,
//         feelsLike,
//         minTemperature,
//         maxTemperature,
//         description,
//         city
//     };
// }

// export default extractWeatherData;

import ICityWeather from "../interfaces/weather";
import WeatherData from "../interfaces/weatherData";

const extractWeatherData = (weatherData: ICityWeather): WeatherData => {
    const temperature = Math.ceil(Number(weatherData.main.temp) - 273.15);
    const feelsLike = Math.ceil(Number(weatherData.main.feels_like) - 273.15);
    const minTemperature = Math.ceil(Number(weatherData.main.temp_min) - 273.15);
    const maxTemperature = Math.ceil(Number(weatherData.main.temp_max) - 273.15);
    const description = weatherData.weather[0].description;
    const city = weatherData.name;

    return {
        temperature,
        feelsLike,
        minTemperature,
        maxTemperature,
        description,
        city
    };
}

export default extractWeatherData;
