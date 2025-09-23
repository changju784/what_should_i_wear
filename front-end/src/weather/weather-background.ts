import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

// Function to fetch weather-related background images from Unsplash
export const getWeatherBackgroundImage = async (weatherCondition: string): Promise<string | null> => {
    try {
        // Map weather conditions to more descriptive Unsplash search queries
        let query = 'weather';
        switch (weatherCondition.toLowerCase()) {
            case 'clear':
                query += ' sunny';
                break;
            case 'rain':
                query += ' rainy';
                break;
            case 'clouds':
                query += ' cloudy sky';
                break;
            case 'snow':
                query += ' snowy landscape';
                break;
            case 'storm':
                query += ' stormy sky';
                break;
            default:
                query = weatherCondition.toLowerCase(); // Use the exact weather condition if no match
        }

        // Call Unsplash API to search for relevant weather images
        const response = await axios.get('https://api.unsplash.com/photos/random', {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
            params: {
                query: query,
                orientation: 'landscape', // Get wide images for backgrounds
                count: 1,
            },
        });

        // Return the URL of the image
        return response.data[0]?.urls?.regular || null;
    } catch (error) {
        console.error('Error fetching weather background:', error);
        return null;
    }
};