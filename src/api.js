import axios from "axios";
import { WEATHER_FORECAST_DAYS } from "./components/Weather";

const api = axios.create({
  baseURL: process.env.REACT_APP_WEATHERAPI_BASE_URL,
  params: { key: process.env.REACT_APP_WEATHERAPI_KEY },
  timeout: 5000,
})

export const fetchWeatherData = async (cityName) => {
  const data = await api.get('/forecast.json', { params: { q: cityName, days: WEATHER_FORECAST_DAYS }});
  return data.data;
}