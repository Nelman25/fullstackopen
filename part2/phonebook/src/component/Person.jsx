/* eslint-disable react/prop-types */

const Person = ({ person, onDeleteContact }) => {
	return (
		<li>
			{person.name} {person.number}
			<button onClick={() => onDeleteContact(person.name, person.id)}>
				delete
			</button>
		</li>
	);
};

export default Person;
