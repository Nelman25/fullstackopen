/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import { getAll, create, update, remove } from "./services/services";
import Person from "./component/Person";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		console.log("Effect");
		getAll().then((contacts) => {
			console.log("promise fulfilled");
			setPersons(contacts);
		});
	}, []);

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
		};

		create(newPerson).then((newContact) => {
			setPersons(persons.concat(newContact));
			setNewName("");
			setNewNumber("");
		});
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

	const handleDeleteContact = (name, id) => {
		if (window.confirm(`Delete ${name}?`)) {
			remove(id).then((removedContact) => {
				const updatedContacts = persons.filter((person) => person.id !== id);
				setPersons(updatedContacts);
			});
		}
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
			<ul>
				{namesToRender.map((person) => (
					<Person
						key={person.id}
						person={person}
						onDeleteContact={handleDeleteContact}
					/>
				))}
			</ul>
		</div>
	);
};

export default App;
