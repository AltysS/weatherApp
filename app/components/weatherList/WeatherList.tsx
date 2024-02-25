import { Button, Card, CardContent, Typography } from "@mui/material";
import WeatherData from "../../interfaces/weatherData";
import { useState } from "react";
import { Box } from "@mui/joy";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { useRouter } from "next/navigation";
import "./weatherList.css";

interface WeatherCardProps extends WeatherData {
  handleRemoveCity: (city: string) => void;
  updateWeatherData: (city: string) => Promise<boolean>;
}

const WeatherList = ({
  description,
  temperature,
  minTemperature,
  maxTemperature,
  city,
  handleRemoveCity,
  updateWeatherData,
}: WeatherCardProps) => {
  const [update, setUpdate] = useState("");

  const handleUpdate = () => {
    setUpdate(`Wheather Updated`);
    setTimeout(() => {
      setUpdate("");
    }, 3000);
  };

  const router = useRouter();

  const navigateToWeatherPage = () => {
    router.push(`weather/${city}`);
  };
  return (
    <Box className="cardContainer">
      <Box
        data-testid="weather-card"
        className="card"
        onClick={(e) => {
          e.stopPropagation();
          navigateToWeatherPage();
        }}
      >
        <Typography className="city">{city}</Typography>
        <Typography className="weather">{description}</Typography>
        <CloudQueueIcon sx={{ color: "orange" }} />
        <Typography className="temp">{temperature}° C</Typography>
        <Box className="minmaxContainer">
          <Box className="min">
            <Typography className="minHeading">Min</Typography>
            <Typography className="minTemp">{minTemperature}°</Typography>
          </Box>
          <Box className="max">
            <Typography className="maxHeading">Max</Typography>
            <Typography className="maxTemp">{maxTemperature}°</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            sx={{ mr: 1 }}
            variant="outlined"
            onClick={async (e) => {
              e.stopPropagation();
              const runUpdate = await updateWeatherData(city);
              if (runUpdate) {
                handleUpdate();
              }
            }}
          >
            Update
          </Button>
          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveCity(city);
            }}
          >
            Remove
          </Button>
        </Box>
        <Box sx={{ height: "3px", mt: 1 }}>
          {update !== "" && (
            <Typography sx={{ color: "lightgreen", fontSize: "10px" }}>
              {update}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherList;
