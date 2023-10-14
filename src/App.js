import React from 'react';
import styled from 'styled-components';
import Clock from './components/Clock';
import { useWeather } from './hooks/useWeather';

function App() {
  const { weatherData } = useWeather();
  const [ time, setTime ] = React.useState(new Date());

  const getBackgroundColor = () => {
    const currentHour = time.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      // Morning background color
      return {
        color: "white",
        background: 'linear-gradient(to bottom, hsl(27, 65%, 50%), hsl(27, 91%, 66%), hsl(27, 66%, 71%))',
      }
    } else if (currentHour >= 12 && currentHour < 18) {
      // Afternoon background color
      return {
        color: "white",
        background: 'linear-gradient(to bottom, hsl(185, 79%, 36%), hsl(185, 52%, 57%), hsl(185, 66%, 71%))',
      };
    } else {
      // Evening/Night background color
      return {
        color: "white",
        background: 'linear-gradient(to bottom, hsl(222, 53%, 22%), hsl(222, 36%, 36%), hsl(222, 87%, 70%))',
      };
    }
  };
  const { color, background } = getBackgroundColor(time);

  return (
    <Wrapper>
      {weatherData ? (
        <Box style={{ color: color , background: background}}>
          <h1>{weatherData.name}</h1>
          <Clock />
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </Box>
      ) : (
        <p>Loading weather data...</p>
      )}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background-color: lightblue;
  padding: 32px;
  border-radius: 8px;
  min-width: 300px;
  min-height: 400px;
`;