import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital.toLowerCase()}&units=metric&appid=${key}`
      )
      .then((res) => {
        setWeather(res.data);
      });
  }, []);

  return (
    <>
      {weather ? (
        <div>
          <h2>{`Weather in ${capital}`}</h2>{" "}
          <p>{`Temp ${weather.main.temp} °C`}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          />
          <p>{`Wind ${weather.wind.speed} m/s`}</p>
        </div>
      ) : (
        <>No weather data to display.</>
      )}
    </>
  );
};

export default Weather;
