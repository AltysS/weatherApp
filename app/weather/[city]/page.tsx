"use client";
import { CircularProgress, Container } from "@mui/material";
import { Button } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import getHourlyWeather from "@/app/api/getHourlyWeather";
import getWeather from "@/app/api/getWeather";
import extractWeatherData from "@/app/functions/extractWeatherData";
import WeatherCard from "@/app/components/weatherCard/WeatherCard";
import WeatherData from "@/app/interfaces/weatherData";
import getHourlyTemperature, {
  HourlyTemperature,
} from "@/app/functions/getHorlyTemperature";
import { useRouter } from "next/navigation";
import { Box } from "@mui/joy";
import "./page.css";

export default function WeatherCardData({
  params,
}: {
  params: { city: string };
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [city, setCity] = useState<WeatherData | null>(null);
  const [tempForecast, setTempForecast] = useState<HourlyTemperature[] | null>(
    null
  );

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const [data, cityData] = await Promise.all([
          getHourlyWeather(params.city),
          getWeather(params.city),
        ]);

        if (data !== null && cityData !== null) {
          setCity(extractWeatherData(cityData));
          setTempForecast(getHourlyTemperature(data));
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    getWeatherData();
  }, [params.city]);

  return (
    <Container className="weathercardContainer ">
      <Box className="cardWrapper">
        {loading ? (
          <Box sx={{ margin: "0 auto" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography sx={{ mb: 5 }} variant="h2" component="h2">
              Weather in {city?.city}
            </Typography>
            {city && tempForecast && (
              <WeatherCard city={city} tempForecast={tempForecast} />
            )}
            <Box sx={{ mt: 10 }}>
              <Button size="lg" onClick={handleGoBack}>
                Back
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
