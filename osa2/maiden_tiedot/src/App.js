import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const { data } = await axios.get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      );
      setWeather(data.current);
    };
    fetchWeather();
  }, [country.capital]);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>spoken languages</h2>
      <Languages languages={country.languages} />
      <img width="200" height="100" src={country.flag} alt="" />
      <h2>Weather in {country.capital} </h2>
      <Weather weather={weather} />
    </div>
  );
};

const Weather = ({ weather }) => {
  return (
    <div>
      <p>
        <b>temperature: </b>
        {weather.temperature} celsius
      </p>
      <img src={weather.weather_icons} alt="" />
      <p>
        <b>wind: </b> {weather.wind_speed} mph to direction {weather.wind_dir}{" "}
      </p>
    </div>
  );
};

const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language) => (
        <li key={language.iso639_2}>{language.name}</li>
      ))}
    </ul>
  );
};

const Filter = ({ filter, setFilter }) => {
  return (
    <>
      find countries{" "}
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
      />
    </>
  );
};

const Countries = ({ countries, setFilter }) => {
  return countries.map((country) => (
    <div>
      <p>{country.name}</p>
      <button onClick={() => setFilter(country.name)}>show</button>
    </div>
  ));
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
      setCountries(data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countries, filter]);

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <SingleCountry country={filteredCountries[0]} />
      ) : (
        <Countries countries={filteredCountries} setFilter={setFilter} />
      )}
    </div>
  );
};

export default App;
