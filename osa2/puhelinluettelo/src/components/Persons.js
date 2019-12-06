import React from 'react'
import './Persons.css'
import Person from './Person'

const Persons = ({persons, searchName, deletePerson}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

    const rows = () => personsToShow.map((person) =>
        <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person)}
        />
    );
    return (
        <div>
            {rows()}
        </div>
    )
};

export default Persons


