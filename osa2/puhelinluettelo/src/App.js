import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, []);

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };

    const handleNameSearch = (event) => {
        setSearchName(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();

        const personObject = {
            name: newName,
            number: newNumber
        };

        if (persons.map(p => p.name).indexOf(newName) > 0) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        setPersons(persons.concat(personObject));
        setNewName('');
        setNewNumber('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                searchName={searchName}
                handleNameSearch={handleNameSearch}
            />
            <h3>Add a New</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handlePersonChange={handlePersonChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                searchName={searchName}
            />
        </div>
    )
};

export default App