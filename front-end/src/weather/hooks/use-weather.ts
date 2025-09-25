import { useState } from "react";
import { getClothingSuggestion, getWeatherData, WeatherData } from "../weather";

// Custom hook to manage weather fetching and suggestions
export const useWeather = () => {
  const [city, setCity] = useState<string>(''); // City input
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Weather data state
  const [error, setError] = useState<string>(''); // Error state
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const fetchWeatherByCity = async (cityName: string) => {
    setLoading(true);
    setError('');
    const data = await getWeatherData(cityName);
    if (data) {
      setWeatherData(data);
    } else {
      setError('Could not fetch weather data.');
    }
    setLoading(false);
  };

  const fetchWeatherByLocation = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError('');
    const data = await getWeatherData('', latitude, longitude);
    if (data) {
      setWeatherData(data);
    } else {
      setError('Could not fetch weather data.');
    }
    setLoading(false);
  };

  return {
    city,
    setCity,
    weatherData,
    error,
    loading,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    getClothingSuggestion,
  };
};