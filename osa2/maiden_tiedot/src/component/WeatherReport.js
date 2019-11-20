import React, {useEffect, useState} from 'react'
import axios from 'axios';

const WeatherReport = ({country}) => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(
        () => {
                axios
                    .get('http://api.weatherstack.com/current?access_key=2284dad303cdb931bda3d8b60c356a16&query=' + country.capital)
                    .then(response => {
                        setWeatherData(response.data);
                    })
        },
        [country.capital]);

    const getWeatherData = () => (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p><strong>temperature: </strong>
                {weatherData.current.temperature} Celsius
            </p>
            <img
                alt=""
                src={weatherData.current.weather_icons}
            />
            <p><strong>wind: </strong>
                {weatherData.current.wind_speed} kph direction
                {weatherData.current.wind_dir}
            </p>
        </div>
    );

    return (
        <div>
            {
                weatherData.length === 0
                    ? <p>Loading weather data...</p>
                    : getWeatherData()
            }
        </div>
    )
};

export default WeatherReport