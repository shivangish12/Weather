import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onSearch(searchValue, event);
  };

  return (
    <div className="search-bar">
      <form>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button onClick={(event) => handleSearch(event)}>Search</button>
      </form>
    </div>
  );
};

const WeatherCard = ({ title, value }) => {
  return (
    <div className="weather-card">
      <h1>{title}</h1>
      <p>{value}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "2fe3c192b40544dca13110721240202",
            q: city,
          },
        })
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data");
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            value={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            value={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            value={`${weatherData.current.condition.text}`}
          />
          <WeatherCard
            title="Wind Speed"
            value={`${weatherData.current.wind_kph}kph`}
          />
        </div>
      )}
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity, event) => {
    setCity(searchCity);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;
