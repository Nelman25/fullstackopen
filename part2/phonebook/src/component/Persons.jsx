/* eslint-disable react/prop-types */
const Persons = ({ namesToRender }) => {
	return (
		<ul>
			{namesToRender.map((person) => (
				<li key={person.id}>
					{person.name} {person.number}
				</li>
			))}
		</ul>
	);
};

export default Persons;
