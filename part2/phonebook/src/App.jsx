import { useState } from "react";

const App = () => {	
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckbox = (e) => {
		setIsChecked(e.target.checked);
	};

	const student = [
		{ name: "Jonel villaver", attendance: { "9/11": null, "9/12": true } },
	];

	student.map((student) => console.log(student.attendance));

	return (
		<div>
			<input type="checkbox" checked={isChecked} onChange={handleCheckbox} />
		</div>
	);
};

export default App;
