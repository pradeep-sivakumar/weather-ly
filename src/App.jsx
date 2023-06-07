import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [searched, setSearched] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=8c2bdfbe3f17a6512bea4a3a0ed3ccdc`;

  const fetch = () => {
    axios
      .get(url)
      .then((res) => {
        setError(false);
        setSearched(true);
        setData(res.data);
      })
      .catch((err) => {
        setError(true);
      });
  };
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetch();
      // setLocation("");
    }
  };
  // console.log(data);
  return (
    <div className="app">

      <header>
        <nav>
          <h1>Weather-ly <i className=" fa-solid fa-cloud"></i></h1>
        </nav>
      </header>

      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          setLocation("");
          fetch();
        }}
      >
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
          required
        />
        <button type="submit" className="btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <div>
        {error && <div className="error-msg">Error in the Location...</div>}
      </div>

      <div className="container">
        {error && searched && (
          <div className="recent">
            <p>Recently Searched :</p>
          </div>
        )}

        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed(1)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {(data.wind.speed * 3.6).toFixed(2)} Km/h
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
