"use client";
import { Button } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Box,
  CircularProgress,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import getCities from "./api/getCities";
import ICity from "./interfaces/cities";
import getWeather from "./api/getWeather";
import extractWeatherData from "./functions/extractWeatherData";
import WeatherData from "./interfaces/weatherData";
import getCookie from "./functions/getCookies";
import setCookies from "./functions/setCookies";
import updateWeather from "./api/updateWeather";
import WeatherList from "./components/weatherList/WeatherList";
import "./page.css";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [openDropList, setOpenDropList] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [activeCities, setActiveCities] = useState<WeatherData[]>([]);

  useEffect(() => {
    const cities = getCookie("cities");
    if (cities && cities.length >= 1) {
      const loadWeatherData = async () => {
        const weatherData: WeatherData[] = [];
        for (let i = 0; i < cities.length; i++) {
          const newWeather = await updateWeather(cities[i].city);
          if (newWeather) {
            const countWeatherData = extractWeatherData(newWeather);
            weatherData.push(countWeatherData);
          }
        }
        setActiveCities(weatherData);
      };
      loadWeatherData();
    }
    setLoading(false);
  }, []);

  const handleCityChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    const value = event.target.value;
    setSelectedCity(value);
    if (value.length > 2) {
      try {
        const data = (await getCities(value)).filter(
          (city, index, self) =>
            index === self.findIndex((c) => c.name === city.name)
        );
        setOpenDropList(true);
        setCityList(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setCityList([]);
      setOpenDropList(false);
    }
  };

  const handleAddCity = async () => {
    setError("");
    const data = await getWeather(selectedCity);
    if (activeCities.find((el) => el.city === data?.name)) {
      setError(`City ${selectedCity} already exists`);
      return;
    }
    if (data) {
      const countWeatherData = extractWeatherData(data);
      setCookies("cities", [...activeCities, countWeatherData]);
      setActiveCities((prev) => [...prev, countWeatherData]);
      setSelectedCity("");
    } else {
      setError(
        "We are sorry, but the requested data is not available in our database."
      );
    }
  };

  const removeCity = (city: string) => {
    setLoading(true);
    const cities = activeCities.filter((el) => el.city !== city);
    setCookies("cities", cities);
    setActiveCities(cities);
    setLoading(false);
  };

  const updateWeatherData = async (city: string): Promise<boolean> => {
    const cityWeather = await updateWeather(city);
    const formData = cityWeather !== null && extractWeatherData(cityWeather);
    const indexToRemove = activeCities.findIndex((el) => el.city === city);
    if (indexToRemove !== -1 && formData) {
      const newActiveCities = [...activeCities];
      newActiveCities.splice(indexToRemove, 1, formData);
      setActiveCities(newActiveCities);
      return true;
    }
    return false;
  };

  return (
    <main>
      <Container className="container">
        {loading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box>
              {activeCities.length > 0 ? (
                <Box>
                  <Typography sx={{ mb: 5 }} variant="h4" component="h4">
                    Last requested Cities
                  </Typography>
                  <Box className="cityListWrapper">
                    {activeCities.map((el) => {
                      return (
                        <WeatherList
                          key={el.maxTemperature + el.city}
                          temperature={el.temperature}
                          feelsLike={el.feelsLike}
                          minTemperature={el.minTemperature}
                          maxTemperature={el.maxTemperature}
                          description={el.description}
                          city={el.city}
                          handleRemoveCity={removeCity}
                          updateWeatherData={updateWeatherData}
                        />
                      );
                    })}
                  </Box>
                </Box>
              ) : (
                <Typography component="h2">
                  There is nothing here yet... Please, add a city to see the
                  weather
                </Typography>
              )}
            </Box>
            <Box
              minWidth={230}
              maxWidth={230}
              sx={{ position: "relative", mt: 5 }}
            >
              <FormControl fullWidth>
                <TextField
                  id="city"
                  label="City"
                  value={selectedCity}
                  onChange={handleCityChange}
                  variant="outlined"
                  sx={{ background: "white" }}
                />
                {openDropList && (
                  <Box className="dropList">
                    {cityList.map((city) => (
                      <Box key={city.name}>
                        <MenuItem
                          onClick={() => {
                            setSelectedCity(city.name);
                            setOpenDropList(false);
                            setCityList(() => []);
                          }}
                        >
                          {city.name}
                        </MenuItem>
                      </Box>
                    ))}
                  </Box>
                )}
              </FormControl>
            </Box>
            <Button
              onClick={handleAddCity}
              sx={{ mt: 5 }}
              disabled={!selectedCity}
              size="lg"
            >
              Add city
            </Button>
            {error && (
              <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>
            )}
          </>
        )}
      </Container>
    </main>
  );
}
