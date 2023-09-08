import Country from "./country";
import SingleCountry from "./singlecountry";

const CountryList = ({ countries, filter }) => {
  let filteredCountries = [];

  if (filter.length > 0) {
    filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  } else {
    filteredCountries = countries;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length == 1) {
    return <SingleCountry country={filteredCountries[0]}></SingleCountry>;
  } else {
    return filteredCountries.map((country) => (
      <Country key={country.name.common} country={country} />
    ));
  }
};

export default CountryList;
