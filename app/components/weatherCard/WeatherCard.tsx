import WeatherData from "@/app/interfaces/weatherData";
import "./weatherCard.css";
import { HourlyTemperature } from "@/app/functions/getHorlyTemperature";
import { Box, Typography } from "@mui/joy";

interface IWeahterCard {
  city: WeatherData;
  tempForecast: HourlyTemperature[];
}

export default function WeatherCard({ city, tempForecast }: IWeahterCard) {
  return (
    <Box className="containerWidget">
      <Box className="widget">
        <Box className="details">
          <Box className="temperature">{city.temperature}</Box>
          <Box className="summary">
            <Typography className="summaryText">{city.description}</Typography>
          </Box>
          <Box className="precipitation">Feels like: {city.feelsLike}</Box>
          <Box className="wind">Min temperature: {city.minTemperature}</Box>
          <Box className="wind">Max temperature: {city.maxTemperature}</Box>
        </Box>
        <Box className="pictoBackdrop"></Box>
        <Box className="pictoFrame"></Box>
        <Box className="pictoCloudBig"></Box>
        <Box className="pictoCloudFill"></Box>
        <Box className="pictoCloudSmall"></Box>
        <Box className="iconCloudBig"></Box>
        <Box className="iconCloudFill"></Box>
        <Box className="iconCloudSmall"></Box>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            background: "white",
            mt: 5,
            mb: 3,
          }}
        ></Box>
        <Typography sx={{ color: "white", fontSize: 24, mb: 3 }}>
          Weather forecast
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {tempForecast.map((el, index) => {
            return (
              <Box key={index} sx={{ mb: 5 }}>
                <Typography sx={{ color: "white" }}>{el.time}</Typography>
                <Typography sx={{ color: "white" }}>
                  {el.temperature} °C
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
