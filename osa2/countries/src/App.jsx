import CountryList from "./components/countrylist";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <form>
        find countries <input value={filter} onChange={handleFilterChange} />
      </form>
      <div>
        <CountryList countries={countries} filter={filter} />
      </div>
    </div>
  );
};

export default App;
