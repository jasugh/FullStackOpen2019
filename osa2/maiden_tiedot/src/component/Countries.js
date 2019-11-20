import React from 'react'
import WeatherReport from "./WeatherReport";

const Countries = ({countries, searchCountry, onShowCountry}) => {
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()));

    const rows = () => countriesToShow.map((country) =>
        <div key={country.name}>
            <div>
                <div>{country.name}
                    <button
                        onClick={onShowCountry.bind(this, country)}
                    >
                        Show
                    </button>
                </div>
            </div>
        </div>
    );

    const row = () => countriesToShow.map((country) =>
        <div key={country.name}>
            <div>
                <h2>{country.name}</h2>
            </div>
            <div>
                Capital {country.capital}
            </div>
            <div>
                Population {country.population}
            </div>
            <br/>
            <h2>Languages</h2>
            {country.languages.map((language) => {
                return (
                    <div key={language.name}>
                        <li>{language.name}</li>
                    </div>
                )
            })}
            <br/>
            <img
                src={country.flag}
                alt=""
                width={200}
                height={100}
            />
            <br/>
            <br/>
            <WeatherReport
                country={countriesToShow[0]}
            />
        </div>
    );

    const countryRows = (() => {
        switch (true) {
            case (countriesToShow.length === 1):
                return row();
            case (countriesToShow.length < 11):
                return rows();
            default:
                return <div>Too many matches, specify another filter</div>;
        }
    })();

    return (
        <div>
            {countryRows}
        </div>
    )
};

export default Countries