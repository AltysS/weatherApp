import IWeatherForecastItem from "../interfaces/WeatherForecast";

export interface HourlyTemperature {
  time: string;
  temperature: number;
}

function getHourlyTemperature(response: IWeatherForecastItem[]): HourlyTemperature[] {
  const hourlyTemperatures: HourlyTemperature[] = [];
  response.slice(0, 10).forEach((item) => {
    const forecastDate = new Date(item.dt * 1000);
    const hours = forecastDate.getHours();
    const minutes = forecastDate.getMinutes();
    const time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    const temperature = item.main.temp;
    hourlyTemperatures.push({ time, temperature: Math.round(temperature) });
  });

  return hourlyTemperatures;
}

export default getHourlyTemperature;
