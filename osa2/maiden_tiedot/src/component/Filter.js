import React from 'react'

const Filter = ({searchCountry, handleCountrySearch}) => {
    return (
        <div>
            filter shown with
            <input
                value={searchCountry}
                onChange={handleCountrySearch}
            />
        </div>
    )
};

export default Filter;