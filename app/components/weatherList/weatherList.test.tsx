import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import WeatherList from "./WeatherList";

// Mock useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("WeatherList component", () => {
  const mockWeatherData = {
    description: "Sunny",
    temperature: 25,
    minTemperature: 20,
    maxTemperature: 30,
    city: "New York",
    feelsLike: 20,
  };

  const mockHandleRemoveCity = jest.fn();
  const mockUpdateWeatherData = jest.fn().mockResolvedValue(true);

  test("renders WeatherList component with correct data", () => {
    render(
      <WeatherList
        {...mockWeatherData}
        handleRemoveCity={mockHandleRemoveCity}
        updateWeatherData={mockUpdateWeatherData}
      />
    );

    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
    expect(screen.getByText("25° C")).toBeInTheDocument();
    expect(screen.getByText("Min")).toBeInTheDocument();
    expect(screen.getByText("20°")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
    expect(screen.getByText("30°")).toBeInTheDocument();
  });

  test("clicking on Update button calls updateWeatherData function", async () => {
    render(
      <WeatherList
        {...mockWeatherData}
        handleRemoveCity={mockHandleRemoveCity}
        updateWeatherData={mockUpdateWeatherData}
      />
    );

    const updateButton = screen.getByText("Update");

    await act(async () => {
      fireEvent.click(updateButton);
    });

    expect(mockUpdateWeatherData).toHaveBeenCalledWith("New York");
  });

  test("clicking on Remove button calls handleRemoveCity function", () => {
    render(
      <WeatherList
        {...mockWeatherData}
        handleRemoveCity={mockHandleRemoveCity}
        updateWeatherData={mockUpdateWeatherData}
      />
    );

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(mockHandleRemoveCity).toHaveBeenCalledWith("New York");
  });

  test("clicking on the card calls navigateToWeatherPage function", () => {
    render(
      <WeatherList
        {...mockWeatherData}
        handleRemoveCity={mockHandleRemoveCity}
        updateWeatherData={mockUpdateWeatherData}
      />
    );

    const card = screen.getByTestId("weather-card");
    fireEvent.click(card);

    expect(mockUpdateWeatherData).toHaveBeenCalledWith("New York");
  });
});
