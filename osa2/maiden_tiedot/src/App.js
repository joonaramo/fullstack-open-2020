import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
      find countries{" "}
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <>
          <h1>{filteredCountries[0].name}</h1>
          <p>capital {filteredCountries[0].capital}</p>
          <p>population {filteredCountries[0].population}</p>
          <h2>languages</h2>
          <ul>
            {filteredCountries[0].languages.map((language) => (
              <li>{language.name}</li>
            ))}
          </ul>
        </>
      ) : (
        filteredCountries.map((country) => <p>{country.name}</p>)
      )}
    </div>
  );
};

export default App;
