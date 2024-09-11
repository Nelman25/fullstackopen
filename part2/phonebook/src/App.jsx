/* eslint-disable no-unused-vars */
import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const addPerson = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
        };
        setPersons(persons.concat(newPerson));
        setNewName("");
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <div>Debug: {newName}</div>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <li key={person.name}>{person.name}</li>
            ))}
        </div>
    );
};

export default App;
