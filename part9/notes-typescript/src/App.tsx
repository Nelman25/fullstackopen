import { useEffect, useState } from "react";
import { Note } from "./types";
import { getAllNotes, createNote } from "./notesServices";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data));
  }, []);

  const addNote = (e: React.SyntheticEvent) => {
    e.preventDefault();

    createNote({ content: newNote }).then((data) =>
      setNotes(notes.concat(data))
    );

    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
