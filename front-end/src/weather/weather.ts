import axios from 'axios';

// Define the WeatherData interface for better type safety
export interface WeatherData {
  temp: number;
  weather: string;
}

// Helper function to get weather based on city or coordinates (latitude, longitude)
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const getWeatherData = async (cityName: string = '', latitude?: number, longitude?: number): Promise<WeatherData | null> => {
  try {
    const url = latitude && longitude
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);
    const { temp } = response.data.main;
    const { main: weather } = response.data.weather[0];

    return { temp, weather };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Helper function to generate clothing suggestions
export const getClothingSuggestion = (temp: number, weather: string): string => {
  if (weather === 'Rain' || weather === 'Drizzle') {
    return 'Wear a waterproof jacket and bring an umbrella.';
  }
  if (temp >= 25) {
    return 'It\'s hot! Wear shorts and a T-shirt.';
  } else if (temp >= 15) {
    return 'A light jacket should be enough.';
  } else {
    return 'It\'s cold! Wear a warm coat and scarf.';
  }
};