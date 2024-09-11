/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Note from "./component/Note";

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("a new note...");
    const [showAll, setShowAll] = useState(true);

    const addNote = (e) => {
        e.preventDefault();
        console.log("Button clicked ", e.target);

        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
            id: notes.length + 1,
        };
        if (noteObject.content !== "") {
            setNotes(notes.concat(noteObject));
            setNewNote("");
        }

        console.log(notes);
    };

    const handleNoteChange = (e) => {
        console.log(e.target.value);
        setNewNote(e.target.value);
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note.content} />
                ))}
                <form onSubmit={addNote}>
                    <input
                        type="text"
                        value={newNote}
                        onChange={handleNoteChange}
                    />
                    <button type="submit">save</button>
                </form>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </ul>
        </div>
    );
};

export default App;
