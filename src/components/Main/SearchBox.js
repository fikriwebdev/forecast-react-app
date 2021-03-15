import { useState } from "react";

import Forecast from "./Forecast";
import Result from "./Result";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [weather, setWeather] = useState("");
  const [forecast, setForecast] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleCity = (e) => {
    e.preventDefault();
    setIsPending(true);
    const API_KEY = "628eb58ebc7cc5384e60627a4726f33a";
    const API_ADDRESS_FORECAST =
      "https://api.openweathermap.org/data/2.5/forecast?";
    const API_ADDRESS = "https://api.openweathermap.org/data/2.5/weather?";

    fetch(`${API_ADDRESS_FORECAST}q=${keyword}&units=metric&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setForecast(result);
        setIsPending(false);
      });

    fetch(`${API_ADDRESS}q=${keyword}&units=metric&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setIsPending(false);
      });

    setKeyword("");
  };

  const getDate = (epoch) => {
    const utcSeconds = epoch;
    const d = new Date(0);
    d.setUTCSeconds(utcSeconds);

    return d.toLocaleString().slice(0, 9);
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 12
            ? "App cold"
            : weather.main.temp < 26
            ? "App warm"
            : weather.main.temp > 26
            ? "App hot"
            : "App"
          : "App"
      }>
      <div className="container">
        <div className="navbar">
          <div className="hamburger-button">
            <button>
              <svg
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="2.93333" rx="1.46667" fill="white" />
                <rect
                  y="5.86667"
                  width="22"
                  height="2.93333"
                  rx="1.46667"
                  fill="white"
                />
                <rect
                  y="11.7333"
                  width="22"
                  height="2.93333"
                  rx="1.46667"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <div className="date">
            {weather.dt !== undefined ? (
              <div>
                <h4>{getDate(weather.dt)}</h4>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="degree">
            <h4>&deg;C</h4>
          </div>
        </div>
        <div className="search-box">
          <form onSubmit={(e) => handleCity(e)}>
            <input
              type="text"
              placeholder="search your city"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
          </form>
        </div>

        <Result weather={weather} isPending={isPending} />
        <Forecast forecast={forecast} isPending={isPending} />
      </div>
    </div>
  );
};

export default SearchBox;
