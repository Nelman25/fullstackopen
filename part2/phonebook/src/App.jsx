/* eslint-disable react/prop-types */
import { useState } from "react";
import Note from "./component/Note";

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("a new note...");
    const [showAll, setShowAll] = useState(true);

    const addNote = (event) => {
        event.preventDefault();
        console.log("button clicked ", event.target);
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
            id: String(notes.length + 1),
        };
        setNotes(notes.concat(noteObject));
        setNewNote("");
    };

    const handleChangeNote = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    };
    console.log(notes);

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);
    console.log(notesToShow);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} content={note.content} />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input
                    type="text"
                    value={newNote}
                    onChange={handleChangeNote}
                />
                <button type="submit">save</button>
            </form>
            <button onClick={() => setShowAll(!showAll)}>
                Show only important notes
            </button>
        </div>
    );
};

export default App;
