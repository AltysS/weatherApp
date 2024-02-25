import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCard from "./WeatherCard";
import WeatherData from "@/app/interfaces/weatherData";
import { HourlyTemperature } from "@/app/functions/getHorlyTemperature";

// Mock data for testing
const mockCityData: WeatherData = {
  temperature: 25,
  description: "Sunny",
  feelsLike: 20,
  minTemperature: 20,
  maxTemperature: 30,
  city: "",
};

const mockTempForecast: HourlyTemperature[] = [
  { time: "12:00 PM", temperature: 26 },
  { time: "1:00 PM", temperature: 27 },
  { time: "2:00 PM", temperature: 28 },
];

describe("WeatherCard component", () => {
  test("renders WeatherCard component with correct data", () => {
    render(<WeatherCard city={mockCityData} tempForecast={mockTempForecast} />);

    // Check if city data is rendered correctly
    expect(screen.getByText("25")).toBeTruthy(); // Check temperature
    expect(screen.getByText("Sunny")).toBeTruthy(); // Check description
    expect(screen.getByText("Feels like: 20")).toBeTruthy(); // Check feels like temperature
    expect(screen.getByText("Min temperature: 20")).toBeTruthy(); // Check min temperature
    expect(screen.getByText("Max temperature: 30")).toBeTruthy(); // Check max temperature

    // Check if hourly temperature forecast is rendered
    mockTempForecast.forEach((forecast) => {
      expect(screen.getByText(forecast.time)).toBeTruthy(); // Check forecast time
      expect(screen.getByText(`${forecast.temperature} °C`)).toBeTruthy(); // Check forecast temperature
    });
  });
});
