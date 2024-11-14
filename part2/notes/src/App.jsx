/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Notes from "./component/Notes";
import { getAll, create, update } from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const importantNotes = notes.filter((note) => note.important);
  const notesToShow = showAll ? notes : importantNotes;

  useEffect(() => {
    console.log("effect");
    getAll().then((initialNotes) => {
      console.log(initialNotes);
      setNotes(initialNotes);
    });
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

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "show important" : "show all"}
      </button>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">add note</button>
      </form>
      <ul>
        {notesToShow.map((note) => (
          <Notes
            key={note.id}
            note={note}
            toggleImportance={() => handleToggleImportance(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
