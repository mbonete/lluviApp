import React from 'react';
import styled from 'styled-components';
import Clock from './components/Clock';
import { useWeather } from './hooks/useWeather';
import Loader from './components/Loader';

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
        src: '/morning.svg'
      }
    } else if (currentHour >= 12 && currentHour < 18) {
      // Afternoon background color
      return {
        color: "white",
        background: 'linear-gradient(to bottom, hsl(185, 79%, 36%), hsl(185, 52%, 57%), hsl(185, 66%, 71%))',
        src: '/noon.svg'
      };
    } else {
      // Evening/Night background color
      return {
        color: "white",
        background: 'linear-gradient(to bottom, hsl(222, 53%, 22%), hsl(222, 36%, 36%), hsl(222, 87%, 70%))',
        src: '/evening.svg'
      };
    }
  };
  const { color, background, src } = getBackgroundColor(time);

  return (
    <Wrapper>
      {weatherData ? (
        <Box style={{ color: color , background: background}}>
          <h1>{weatherData.name}</h1> 
          
          <Clock />
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <Image src={src} alt='' />
        </Box>
      ) : (
        <LoadingWrapper>
          Obtaining geolocation...
          <Loader/>
        </LoadingWrapper>
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
  position: relative;
  padding: 32px;
  min-width: 320px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin: 0 auto;
  max-width: 850px;
  max-height: 1600px;

  @media(max-height: 380px) {
    display: none
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3rem;

  @media(max-width: 500px) {
    font-size: 1rem;
  }
`;