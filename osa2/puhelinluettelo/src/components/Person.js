import React from 'react'
import './Persons.css'

const Person = ({person, deletePerson}) => {

    return (
        <div>
            <ul key={person.id}>
                <li>
                    {person.name}
                </li>
                <li>
                    {person.number}
                </li>
                <li>
                    <button
                        onClick={deletePerson}
                    >
                        delete
                    </button>
                </li>
            </ul>
        </div>
    )
};

export default Person