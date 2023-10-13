import React, { useEffect, useState, useRef } from 'react';

function App() {
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

  return (
    <>
      
      <div>
        {weatherData ? (
          <div>
            <h1>Weather in {weatherData.name}</h1>
            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>Conditions: {weatherData.weather[0].description}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </>
  );
}

export default App;