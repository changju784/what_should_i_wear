import React, { useState, useEffect } from 'react';
import { useWeather } from '../weather/use-weather';
import { getWeatherBackgroundImage } from '../weather/weather-background';
import WeatherInput from './WeatherInput';
import WeatherDisplay from './WeatherDisplay';
import Form from './Form';
import { useAuth } from '../auth/useAuth';
import { User } from 'firebase/auth';

const Dashboard: React.FC = () => {
    const {
        city,
        setCity,
        weatherData,
        error,
        loading,
        fetchWeatherByCity,
        fetchWeatherByLocation,
        getClothingSuggestion,
    } = useWeather();

    const [backgroundImage, setBackgroundImage] = useState<string>('default_background.png');
    const { user } = useAuth();

    useEffect(() => {
        if (weatherData) {
            const weatherCondition = weatherData.weather.toLowerCase();
            getWeatherBackgroundImage(weatherCondition).then((imageUrl) => {
                if (imageUrl) {
                    setBackgroundImage(imageUrl);
                }
            });
        }
    }, [weatherData]);

    return (
        <div
            className="min-h-screen bg-cover bg-center p-8"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Form onSubmit={(e) => {
                e.preventDefault();
                fetchWeatherByCity(city);
            }}>
                <WelcomeMsg user={user} />
                <WeatherInput
                    city={city}
                    onCityChange={setCity}
                    onSubmit={() => fetchWeatherByCity(city)} // Pass city to fetchWeatherByCity
                    onUseLocation={() => {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => fetchWeatherByLocation(pos.coords.latitude, pos.coords.longitude),
                            (err) => console.error(err)
                        );
                    }}
                />

                {loading && <p className="text-white mt-4">Loading...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}

            </Form>

            {weatherData && (
                <WeatherDisplay
                    temp={weatherData.temp}
                    weather={weatherData.weather}
                    suggestion={getClothingSuggestion(weatherData.temp, weatherData.weather)}
                />
            )}
        </div>
    );
};

interface WelcomeMsgProps {
    user: User | null;
}

const WelcomeMsg: React.FC<WelcomeMsgProps> = ({ user }) => {
    return (
        <>
            {user && (
                <p className="text-2xl font-bold mb-6 text-gray-500 drop-shadow-lg">
                    👋 Welcome, {user.email}!
                </p>
            )}
        </>
    );
};

export default Dashboard;
