/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getAll, create, update, remove } from "./services/services";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Person from "./component/Person";
import Notification from "./component/Notification";

const NORMALIZEWORD = (word) => {
  return word.toLowerCase().trim();
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isAdded, setIsAdded] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    name: "",
  });

  useEffect(() => {
    getAll().then((contacts) => setPersons(contacts));
  }, []);

  const names = persons.map((person) => NORMALIZEWORD(person.name));
  const nameAlreadyExist = names.includes(NORMALIZEWORD(newName));
  const namesToRender = persons.filter((person) => {
    const personName = person.name.toLowerCase();
    return personName.includes(NORMALIZEWORD(searchText));
  });

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const addPerson = async (e) => {
    e.preventDefault();

    if (newName === "" || newNumber === "") {
      alert("There's a missing input, try again");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (nameAlreadyExist) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        try {
          const selectedContact = persons.find(
            (person) => NORMALIZEWORD(person.name) === NORMALIZEWORD(newName)
          );
          const filteredContacts = persons.filter(
            (person) => NORMALIZEWORD(person.name) !== NORMALIZEWORD(newName)
          );

          const updatedPerson = await update(selectedContact.id, newPerson);
          const updatedContacts = [...filteredContacts, updatedPerson];
          setPersons(updatedContacts);
          setIsAdded(!isAdded);
        } catch (error) {
          setNotification({
            name: "",
            message:
              "The information of the user has already been deleted from server. ",
          });
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
          setIsAdded(!isAdded);
        }
      }
      return;
    }

    try {
      const newContact = await create(newPerson);
      setPersons(persons.concat(newContact));
      setNewName("");
      setNewNumber("");
      setIsAdded(!isAdded);
      setNotification({
        name: newName,
        message: "Added ",
      });
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      remove(id).then((removedContact) => {
        const updatedContacts = persons.filter((person) => person.id !== id);
        setPersons(updatedContacts);
        setIsAdded(true);
        setNotification({
          name: name,
          message: "Deleted ",
        });
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      });
    }
  };

  return (
    <div className="bg-amber-300 flex justify-center items-center min-h-[100vh] font-mono">
      <div className="w-[30%] min-h-[960px] bg-slate-800 rounded-3xl p-4 flex shadow-2xl my-16">
        <div className="bg-slate-50 grow shrink rounded-3xl p-4 mb-4 relative">
          <div className="bg-slate-700 size-[1.3rem] mx-auto rounded-full flex justify-center items-center">
            <div className="bg-slate-200 size-[.6rem] rounded-full"></div>
          </div>
          <div>
            <h2 className="text-2xl bold text-center my-8">Phonebook</h2>
            <Filter value={searchText} onSearch={handleChangeSearch} />
            {showNotification ? (
              <Notification notification={notification} />
            ) : (
              <></>
            )}
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
