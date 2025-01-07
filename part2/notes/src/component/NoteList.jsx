/* eslint-disable react/prop-types */
import Notes from "./Notes";

const NoteList = ({ notesToShow, toggleImportance, onDelete }) => {
  return (
    <ul className="list-disc mt-10 min-w-[400px] bg-yellow-100 py-8 w-full px-8 border border-slate-600 shadow-xl rounded-xl">
      {notesToShow.map((note) => (
        <Notes
          onDelete={onDelete}
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

export default NoteList;
