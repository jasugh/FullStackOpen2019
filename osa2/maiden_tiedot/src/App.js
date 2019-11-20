import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Filter from "./component/Filter";
import Countries from "./component/Countries";

function App() {
    const [countries, setCountries] = useState([]);
    const [searchCountry, setSearchCountry] = useState('');

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, []);

    const handleCountrySearch = (event) => {
        setSearchCountry(event.target.value);
    };

    const onShowCountry = (country, event) => {
        setSearchCountry(country.name);
    };

    return (
        <div>
            <Filter
                searchCountry={searchCountry}
                handleCountrySearch={handleCountrySearch}
            />
            <Countries
                countries={countries}
                searchCountry={searchCountry}
                onShowCountry={onShowCountry}
            />
        </div>
    );
}

export default App;
