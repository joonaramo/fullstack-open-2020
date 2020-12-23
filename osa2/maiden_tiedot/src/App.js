import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
    </div>
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
