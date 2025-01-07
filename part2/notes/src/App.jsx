/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Notes from "./component/Notes";
import { getAll, create, update, deleteItem } from "./services/notes";
import NoteList from "./component/NoteList";
import NoteForm from "./component/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const importantNotes = notes.filter((note) => note.important);
  const notesToShow = showAll ? notes : importantNotes;

  useEffect(() => {
    getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleToggleImportance = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    update(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      })
      .catch((error) => {
        alert(`the note ${note.content} was already deleted from the server`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const addNote = (e) => {
    e.preventDefault();

    if (newNote === "") {
      console.log("please enter a new note.");
      return;
    }

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length + 1),
    };

    create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
      setNewNote("");
    });
  };

  const deleteNote = async (id) => {
    await deleteItem(id);
    const filteredNotes = [...notes].filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  return (
    <div className="font-mono my-10 mx-40 min-w-[400px] max-w-[900px]">
      <h1 className="text-blue-800 text-[5rem]">Notes</h1>
      <div className="flex justify-between">
        <NoteForm
          addNote={addNote}
          onChangeNote={handleNoteChange}
          newNote={newNote}
        />
        <button
          className="bg-blue-300 px-4 py-2 rounded-xl shadow-lg border border-slate-700"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "show important" : "show all"}
        </button>
      </div>
      <NoteList
        onDelete={deleteNote}
        notesToShow={notesToShow}
        toggleImportance={handleToggleImportance}
      />
    </div>
  );
};

export default App;
