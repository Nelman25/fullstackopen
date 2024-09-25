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
	const [isAdded, setIsAdded] = useState(true);

	useEffect(() => {
		console.log("Effect");
		getAll().then((contacts) => {
			console.log("promise fulfilled");
			setPersons(contacts);
		});
	}, []);

	const names = persons.map((person) => person.name.toLowerCase().trim());
	const nameAlreadyExist = names.includes(newName.toLowerCase().trim());
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
			if (
				window.confirm(
					`${newName} is already added to the phonebook, replace the old number with a new one?`
				)
			) {
				const selectedPerson = persons.find(
					(person) =>
						person.name.trim().toLowerCase() === newName.toLowerCase().trim()
				);
				const updatedNumber = {
					...selectedPerson,
					number: newNumber,
				};

				update(selectedPerson.id, updatedNumber).then((updatedContact) => {
					const updatedContacts = persons.map((person) =>
						person.id !== selectedPerson.id ? person : updatedContact
					);
					setPersons(updatedContacts);
					setIsAdded(!isAdded);
				});
				return;
			}
		}

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		create(newPerson).then((newContact) => {
			setPersons(persons.concat(newContact));
			setNewName("");
			setNewNumber("");
			setIsAdded(!isAdded);
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
		<div className="bg-amber-300 flex justify-center items-center min-h-[100vh] font-mono">
			{/* Phone */}
			<div className="w-[30%] min-h-[960px] bg-slate-800 rounded-3xl p-4 flex shadow-2xl my-16">
				{/* Screen */}
				<div className="bg-slate-50 grow shrink rounded-3xl p-4 mb-4 relative">
					{/* notch */}
					<div className="bg-slate-700 size-[1.3rem] mx-auto rounded-full flex justify-center items-center">
						{/* camera */}
						<div className="bg-slate-200 size-[.6rem] rounded-full"></div>
					</div>
					{/* content container */}
					<div>
						<h2 className="text-2xl bold text-center my-8">Phonebook</h2>
						<Filter value={searchText} onSearch={handleChangeSearch} />
						{isAdded ? (
							<>
								<h3 className="text-2xl bold mt-8 mb-4">Contacts</h3>
								<ul>
									{namesToRender.map((person) => (
										<Person
											key={person.id}
											person={person}
											onDeleteContact={handleDeleteContact}
										/>
									))}
								</ul>
							</>
						) : (
							<PersonForm
								onAddPerson={addPerson}
								newName={newName}
								onChangeName={handleNameChange}
								newNumber={newNumber}
								onChangeNumber={handleNumberChange}
							/>
						)}
					</div>
					{isAdded && (
						<div>
							<button
								className="bg-amber-300 rounded-full size-16 text-3xl bold shadow-xl absolute right-[20px] bottom-[20px]"
								onClick={() => setIsAdded(!isAdded)}
							>
								+
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
