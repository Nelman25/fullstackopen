/* eslint-disable react/prop-types */
const Notes = ({ note, toggleImportance, onDelete }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="px-4 py-2 grid grid-cols-custom-3 gap-x-4 bg-blue-300 my-1 border-b border-b-slate-700 rounded-md">
      <p className="col-span-3 self-center">{note.content}</p>
      <button
        className="bg-blue-200 rounded-md col-span-2"
        onClick={toggleImportance}
      >
        {label}
      </button>
      <button
        className="col-span-1 justify-center rounded-lg py-2 bg-red-300 flex items-center"
        onClick={() => onDelete(note.id)}
      >
        delete
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>
    </li>
  );
};

export default Notes;
