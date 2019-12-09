import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');
    const [message, setMessage] = useState(null);
    const [messageClass, setMessageClass] = useState(message);

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
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

        const p = persons.find(person => person.name === newName);

        if (p) {
            if (window.confirm(`${newName} is already added to phone book, replace the old number with a new one?`)) {
                p.number = newNumber;
                personService
                    .update(p)
                    .then(data => {
                        setMessage(
                            `Person ${data.name} updated successfully`
                        );
                        setMessageClass('message');
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000);
                        setPersons(persons.map(person => person.id !== data.id ? person : data));
                        setNewName('');
                        setNewNumber('')
                    })
                    .catch(error => {
                        setMessage(
                            `Person ${newName} could not be updated`
                        );
                        setMessageClass('error');
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000);
                    })
            }
            return;
        }

        personService
            .create(personObject)
            .then(data => {
                setMessage(
                    `Added ${data.name}`
                );
                setMessageClass('message');
                setTimeout(() => {
                    setMessage(null)
                }, 5000);

                setPersons(persons.concat(data));
                setNewName('');
                setNewNumber('')
            })
            .catch(error => {
                setMessage(
                    `${error.response.data}`
                );
                setMessageClass('error');
                setTimeout(() => {
                    setMessage(null)
                }, 5000);
            })
    };

    const deletePerson = (person) => {
        if (window.confirm('Delete ' + person.name)) {
            personService.remove(person.id)
                .then(data => {
                    setMessage(
                        `Person ${person.name} was deleted`
                    );
                    setMessageClass('message');
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000);
                    setPersons(persons.filter(p => p.id !== person.id))
                })
                .catch(error => {
                    setMessage(
                        `${person.name} was already deleted`
                    );
                    setMessageClass('error');
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000);
                    setPersons(persons.filter(p => p.id !== person.id));
                })
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} messageClass={messageClass}/>

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
                deletePerson={deletePerson}
            />
        </div>
    )
};

export default App