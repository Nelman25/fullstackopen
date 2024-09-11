/* eslint-disable no-unused-vars */
import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
    const [newName, setNewName] = useState("");
    const names = persons.map((person) => person.name.toLowerCase());
    const nameAlreadyExist = names.includes(newName.toLowerCase());

    const addPerson = (e) => {
        e.preventDefault();
        if (nameAlreadyExist) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }
        const newPerson = {
            name: newName,
            id: persons.length + 1,
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
                <li key={person.id}>{person.name}</li>
            ))}
        </div>
    );
};

export default App;
