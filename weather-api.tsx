import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledWeatherWidget = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  h2 {
    margin-top: 0;
  }

  .weather-icon {
    font-size: 4rem;
  }

  .weather-description {
    text-transform: capitalize;
  }
`;

const WeatherWidget = ({ location, apiKey }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [geolocationData, setGeolocationData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
                );
                setWeatherData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWeatherData();
    }, [location, apiKey]);

    useEffect(() => {
        const fetchGeolocationData = async () => {
            try {
                const response = await axios.get(
                    "https://ipapi.co/json/?key=your_api_key"
                );
                setGeolocationData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchGeolocationData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!weatherData || !geolocationData) return null;

    const { name, main, weather } = weatherData;
    const { latitude, longitude } = geolocationData;

    return (
        <StyledWeatherWidget>
            <h2>Weather in {name}</h2>
            <i className={`wi wi-owm-${weather[0].id} weather-icon`} />
            <div className="temperature">{Math.round(main.temp)}°C</div>
            <div className="weather-description">{weather[0].description}</div>
            <div>
                Your current location: {latitude}, {longitude}
            </div>
        </StyledWeatherWidget>
    );
};

WeatherWidget.propTypes = {
    location: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
};

export default WeatherWidget;
