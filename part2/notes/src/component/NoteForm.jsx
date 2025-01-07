/* eslint-disable react/prop-types */
const NoteForm = ({addNote, newNote, onChangeNote}) => {
  return (
    <form onSubmit={addNote}>
      <input
        className="border mr-4 px-4 py-2 rounded-lg"
        placeholder="Enter a note"
        type="text"
        value={newNote}
        onChange={onChangeNote}
      />
      <button type="submit">Add note</button>
    </form>
  );
};

export default NoteForm;
