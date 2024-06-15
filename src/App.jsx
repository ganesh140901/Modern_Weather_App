import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const apikey = "821702b61f1b6c0d1be0926bc142b0c6";
  const [data, setData] = useState({});
  const [city, setCity] = useState("Delhi");

  const getWeatherData = (city) => {
    if (!city) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apikey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getWeatherData(city);
  }, [city]);

  const handleSearch = () => {
    getWeatherData(city);
  };

  return (
    <div className="col-md-12">
      <div className="weather-bg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weather-result">
          <img
            className="icon"
            src={`http://openweathermap.org/img/w/${data.weather?.[0]?.icon}.png`}
            alt="Weather Icon"
          />
          <h5 className="city">{data.name}</h5>
          <h6 className="temp">{(data.main?.temp - 273.15).toFixed(2)}°C</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
