/* eslint-disable react/prop-types */
const PersonForm = ({
	onAddPerson,
	newName,
	onChangeName,
	newNumber,
	onChangeNumber,
}) => {
	return (
		<form
			onSubmit={onAddPerson}
			className="mt-8 px-8 py-4 rounded-xl shadow-md bg-sky-200 w-[80%] mx-auto"
		>
			<h2 className="text-xl font-mono">Add new contact</h2>
			<div className="">
				<input
					className="border border-slate-700 w-full rounded-xl outline-none py-1 px-2 mb-4"
					placeholder="Name"
					value={newName}
					required
					onChange={onChangeName}
				/>
			</div>
			<div>
				<input
					placeholder="Phone number"
					className="border border-slate-700 w-full rounded-xl outline-none py-1 px-2"
					value={newNumber}
					required
					onChange={onChangeNumber}
				/>
			</div>
			<div>
				<button className="bg-amber-300 w-[140px] rounded-xl py-2 px-4 my-2 ml-52" type="submit">
					Add contact
				</button>
			</div>
		</form>
	);
};

export default PersonForm;
