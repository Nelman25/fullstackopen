/* eslint-disable react/prop-types */

const Person = ({ person, onDeleteContact }) => {
  return (
    <div className="flex justify-between">
      <li className="flex flex-1">
        <div className="flex-1">{person.name}</div>
        <div className="flex-1">{person.number}</div>
      </li>
      <button
        className="bg-red-200 px-2 py-1 rounded-xl my-1"
        onClick={() => onDeleteContact(person)}
      >
        Delete
      </button>
    </div>
  );
};

export default Person;
