import React, { useEffect, useState, useRef, createContext, useContext } from 'react';

const WeatherContext = createContext({});

export function WeatherProvider({children}) {

  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const latRef = useRef(40.7142); // Default latitude
  const lonRef = useRef(-74.00597); // Default longitude

  useEffect(() => {
    // Function to fetch weather data based on the given coordinates
    const fetchWeatherData = (lat, lon) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    };

    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          latRef.current = position.coords.latitude;
          lonRef.current = position.coords.longitude;

          // Fetch weather data based on the current coordinates
          fetchWeatherData(latRef.current, lonRef.current);
        },
        function (error) {
          console.log('Error getting geolocation:', error);
          // Geolocation failed, keep using the default values
          fetchWeatherData(latRef.current, lonRef.current);
        }
      );
    } else {
      console.log('Geolocation is not available in this browser.');
      // Geolocation not available, keep using the default values
      fetchWeatherData(latRef.current, lonRef.current);
    }
  }, []);

  const value = { weatherData }

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export const useWeather = () => useContext(WeatherContext);

