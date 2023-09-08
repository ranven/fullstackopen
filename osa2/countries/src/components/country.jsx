import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./weather";

const Country = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  const toggleShowCountry = () => {
    setShowCountry(!showCountry);
  };

  return (
    <>
      {showCountry ? (
        <>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}> {language} </li>
            ))}
          </ul>
          <img src={country.flags.png} height="150" width="200" />
          <Weather capital={country.capital[0]}></Weather>
          <button onClick={toggleShowCountry}>hide</button>
        </>
      ) : (
        <>
          <li>{country.name.common}</li>
          <button onClick={toggleShowCountry}>show</button>
        </>
      )}
    </>
  );
};

export default Country;
