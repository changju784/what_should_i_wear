import React from 'react';
import * as Label from '@radix-ui/react-label';

interface Props {
    city: string;
    onCityChange: (val: string) => void;
    onSubmit: () => void;
    onUseLocation: () => void;
}

const WeatherInput: React.FC<Props> = ({ city, onCityChange, onSubmit, onUseLocation }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={onUseLocation}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
                Use My Location
            </button>

            <p>
                OR
            </p>

            <div className="flex flex-col gap-2">
                <Label.Root htmlFor="city" className="text-black font-medium">
                    Enter city
                </Label.Root>
                <input
                    id="city"
                    value={city}
                    onChange={(e) => onCityChange(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-64"
                />
                <button
                    onClick={onSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Get Weather
                </button>
            </div>
        </div>
    );
};

export default WeatherInput;