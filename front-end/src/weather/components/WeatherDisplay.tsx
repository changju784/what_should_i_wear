import React from 'react';

interface Props {
    temp: number;
    weather: string;
    suggestion: string;
}

const WeatherDisplay: React.FC<Props> = ({ temp, weather, suggestion }) => {
    return (
        <div className="mt-6 text-white bg-black/50 p-4 rounded shadow-lg">
            <p>🌡️ Temperature: {temp}°C</p>
            <p>☁️ Weather: {weather}</p>
            <p>👕 Clothing Suggestion: {suggestion}</p>
        </div>
    );
};

export default WeatherDisplay;