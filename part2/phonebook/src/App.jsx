/* eslint-disable no-unused-vars */
import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchText, setSearchText] = useState("");

    const names = persons.map((person) => person.name.toLowerCase());
    const nameAlreadyExist = names.includes(newName.toLowerCase());
    const namesToRender = persons.filter((person) => {
        const personName = person.name.toLowerCase();
        return personName.includes(searchText.toLowerCase());
    });

    const addPerson = (e) => {
        e.preventDefault();

        if (newName === "" || newNumber === "") {
            console.log("There's a missing input, try again");
            return;
        }

        if (nameAlreadyExist) {
            alert(`${newName} is already added to the phonebook`);
            setNewName("");
            setNewNumber("");
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };

        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with
                <input
                    type="text"
                    value={searchText}
                    onChange={handleChangeSearch}
                />
            </div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name:
                    <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {namesToRender.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}
                </li>
            ))}
        </div>
    );
};

export default App;
