/* eslint-disable no-unused-vars */
import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const names = persons.map((person) => person.name.toLowerCase());
    const nameAlreadyExist = names.includes(newName.toLowerCase());

    const addPerson = (e) => {
        e.preventDefault();

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

    return (
        <div>
            <h2>Phonebook</h2>
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
            {persons.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}
                </li>
            ))}
        </div>
    );
};

export default App;
