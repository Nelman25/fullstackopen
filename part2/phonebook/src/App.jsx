/* eslint-disable no-unused-vars */
import { useState } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";

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
				<Filter value={searchText} onSearch={handleChangeSearch} />
			</div>
			<h3>Add a new</h3>
			<PersonForm
				onAddPerson={addPerson}
				newName={newName}
				onChangeName={handleNameChange}
				newNumber={newNumber}
				onChangeNumber={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons namesToRender={namesToRender} />
		</div>
	);
};

export default App;
