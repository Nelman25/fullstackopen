/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchText, setSearchText] = useState("");

	const names = persons.map((person) => person.name.toLowerCase());
	const nameAlreadyExist = names.includes(newName.toLowerCase());
	const namesToRender = persons.filter((person) => {
		const personName = person.name.toLowerCase();
		return personName.includes(searchText.toLowerCase());
	});

	useEffect(() => {
		console.log("Effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	console.log(persons);

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
