import React from 'react'

const Persons = ({persons, searchName}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

    const rows = () => personsToShow.map((person) =>
        <ul key={person.name}>
            {person.name}
            {person.number}
        </ul>
    );

    return (
        <div>
            {rows()}
        </div>
    )
};

export default Persons